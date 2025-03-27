import { NextFunction, Request, Response, Router } from 'express';
import { GenericResponse } from "../models/authResponse";
import { EmailModel } from "../models/EmailModel";
import { loginService, registerService } from '../services/authService';

const router = Router();

//TODO: login
router.post('/users/:email', async (req: Request, res: Response) => {
  try {

    const { email } = req.params;

    console.log(email)

    // Llamar al servicio de login
    const result: GenericResponse<EmailModel> = await loginService(email);

    // Determinar el código de estado basado en el mensaje
    switch (result.mensaje) {
      case 'Se requiere un correo electrónico':
        return res.status(400).json(result);
      case 'No existe correo':
        return res.status(404).json(result);
      case 'Login exitoso':
        return res.status(200).json(result);
      default:
        return res.status(500).json({
          mensaje: 'Error inesperado',
          detalle: null
        });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor',
      detalle: null
    });
  }
});

//TODO: Registrar un nuevo usuario
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    console.log(email)
    const result = await registerService(email);

    // Determinamos el status HTTP según el mensaje devuelto
    if (result.mensaje === 'Se requiere un correo electrónico') {
      return res.status(400).json(result);
    }
    if (result.mensaje === 'El correo ya está registrado') {
      return res.status(409).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error en registerService:', error);
    next(error);
  }
});

export const authRouter = router;