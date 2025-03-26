import { db } from './../config/firebase';
import { GenericResponse } from './../models/authResponse';
import { EmailModel } from '../models/EmailModel';


export async function loginService(mail: string): Promise<GenericResponse<EmailModel>> {
    // Validación de entrada
    if (!mail) {
        return {
            mensaje: 'Se requiere un correo electrónico',
            detalle: null,
        };
    }

    // Consulta a Firestore
    const snapshot = await db.collection('contacts')
        .where('email', '==', mail)
        .get();

    // Verificar si el usuario existe
    if (snapshot.empty) {
        return {
            mensaje: 'Credenciales incorrectas',
            detalle: null,
        };
    }

    // Si el usuario existe, construimos la respuesta exitosa
    const response: GenericResponse<EmailModel> = {
        mensaje: 'Login exitoso',
        detalle: [{
            estado: true,
            email: mail,
        }],
    };

    return response;
}

export async function registerService(mail: string): Promise<GenericResponse<{ id: string }>> {
    // Validar el correo
    if (!mail) {
        return {
            mensaje: 'Se requiere un correo electrónico',
            detalle: null,
        };
    }

    // Consultar si el correo ya está registrado
    const snapshot = await db.collection('contacts')
        .where('email', '==', mail)
        .get();

    if (!snapshot.empty) {
        return {
            mensaje: 'El correo ya está registrado',
            detalle: null,
        };
    }

    // Agregar el nuevo correo en Firestore
    const newDoc = await db.collection('contacts').add({ email: mail });

    return {
        mensaje: 'Correo creado exitosamente',
        detalle: [{ id: newDoc.id }],
    };
}