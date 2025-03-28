"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
exports.registerService = registerService;
const firebase_1 = require("./../config/firebase");
async function loginService(mail) {
    // Validación de entrada
    if (!mail) {
        return {
            mensaje: 'Se requiere un correo electrónico',
            detalle: null,
            status: 400,
        };
    }
    // Consulta a Firestore
    const snapshot = await firebase_1.db.collection('contacts')
        .where('email', '==', mail)
        .get();
    // Verificar si el usuario existe
    if (snapshot.empty) {
        return {
            mensaje: 'No existe correo',
            detalle: null,
            status: 404,
        };
    }
    // Si el usuario existe, construimos la respuesta exitosa
    return {
        mensaje: 'Login exitoso',
        detalle: [{
                estado: true,
                email: mail,
            }],
        status: 200,
    };
}
async function registerService(mail) {
    // Validar el correo
    if (!mail) {
        return {
            mensaje: 'Se requiere un correo electrónico',
            detalle: null,
            status: 400
        };
    }
    // Consultar si el correo ya está registrado
    const snapshot = await firebase_1.db.collection('contacts')
        .where('email', '==', mail)
        .get();
    if (!snapshot.empty) {
        return {
            mensaje: 'El correo ya está registrado',
            detalle: null,
            status: 409
        };
    }
    // Agregar el nuevo correo en Firestore
    const newDoc = await firebase_1.db.collection('contacts').add({ email: mail });
    return {
        mensaje: 'Correo creado exitosamente',
        detalle: [{ id: newDoc.id }],
        status: 201
    };
}
