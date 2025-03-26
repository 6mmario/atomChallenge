import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { authRouter } from "./routes/auth";
import dotenv from 'dotenv';
import { tareas } from './routes/task';
dotenv.config(); // Carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Port: " + PORT);

// Middlewares
app.use(express.json());       // Para leer JSON
app.use(morgan('dev'));        // Para visualizar requests

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('Servidor corriendo con Node.js + TypeScript + Express 🎉');
});

// Rutas de la
app.use(authRouter);
app.use(tareas)

// Middleware para manejar rutas no encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada',
    detalle: null
  });
});

// Middleware de manejo de errores global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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

export default app;