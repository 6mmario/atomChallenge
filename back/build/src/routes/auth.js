"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const authService_1 = require("../services/authService");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//TODO: login
router.post('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email);
        // Llamar al servicio de login
        const result = await (0, authService_1.loginService)(email);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
//TODO: Registrar un nuevo usuario
router.post('/users', async (req, res, _next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const result = await (0, authService_1.registerService)(email);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
exports.authRouter = router;
