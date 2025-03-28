import * as admin from "firebase-admin";

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Obtener una instancia de Firestore
export const db = admin.firestore();
