"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = require("./routes/auth");
const dotenv_1 = __importDefault(require("dotenv"));
const task_1 = require("./routes/task");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Carga las variables de entorno
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
console.log("Port: " + PORT);
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
// Middlewares
app.use(express_1.default.json()); // Para leer JSON
app.use((0, morgan_1.default)('dev')); // Para visualizar requests
// Ruta de prueba
app.get('/', (_req, res) => {
    res.send('Servidor corriendo con Node.js + TypeScript + Express 🎉');
});
// Rutas de la
app.use(auth_1.authRouter);
app.use(task_1.tareas);
// Middleware para manejar rutas no encontradas
app.use((_req, res) => {
    res.status(404).json({
        mensaje: 'Ruta no encontrada',
        detalle: null
    });
});
// Middleware de manejo de errores global
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        mensaje: 'Error interno del servidor',
        detalle: null
    });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
exports.default = app;
