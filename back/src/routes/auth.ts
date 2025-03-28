
import { GenericResponse } from "../models/authResponse";
import { EmailModel } from "../models/EmailModel";
import { loginService, registerService } from '../services/authService';
import express, { NextFunction, Request, Response, Router } from 'express';

const router = express.Router();

//TODO: login
router.get('/users/:email', async (req: Request, res: Response) => {
  try {

    const { email } = req.params;

    console.log(email)

    // Llamar al servicio de login
    const result: GenericResponse<EmailModel> = await loginService(email);

    res.status(result.status).json(result);

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({
      mensaje: 'Error interno del servidor',
      detalle: null
    });
  }
});

//TODO: Registrar un nuevo usuario
router.post('/users', async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email } = req.body;
    console.log(email)
    const result = await registerService(email);

    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({
      mensaje: 'Error interno del servidor',
      detalle: null
    });
  }
});

export const authRouter = router;