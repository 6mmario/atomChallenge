import * as admin from 'firebase-admin';



// Cargar el archivo JSON de la cuenta de servicio
const serviceAccount = require("./../firebase-key.json");

// Inicializar Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ''
});

// Obtener una instancia de Firestore
export const db = admin.firestore();