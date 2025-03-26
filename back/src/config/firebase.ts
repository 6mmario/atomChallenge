import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

console.log(serviceAccountPath);
if (!serviceAccountPath) {
    throw new Error("No se encontró la ruta de la credencial en GOOGLE_APPLICATION_CREDENTIALS");
}

// Cargar el archivo JSON de la cuenta de servicio
const serviceAccount = require(serviceAccountPath);

// Inicializar Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Obtener una instancia de Firestore
export const db = admin.firestore();