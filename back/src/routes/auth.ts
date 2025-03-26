import { NextFunction, Request, Response, Router } from 'express';
import { GenericResponse } from "../models/authResponse";
import { EmailModel } from "../models/EmailModel";
import { loginService, registerService } from '../services/authService';

const router = Router();

router.post('/users/:mail', async (req: Request, res: Response) => {
  try {

    const { mail } = req.params;

    // Llamar al servicio de login
    const result: GenericResponse<EmailModel> = await loginService(mail);

    // Determinar el código de estado basado en el mensaje
    switch (result.mensaje) {
      case 'Se requiere un correo electrónico':
        return res.status(400).json(result);
      case 'Credenciales incorrectas':
        return res.status(401).json(result);
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

// Ruta POST /register
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mail } = req.body;
    const result = await registerService(mail);

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