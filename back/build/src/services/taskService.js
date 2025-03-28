"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.addTask = addTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
// src/services/taskService.ts
const firebase_1 = require("./../config/firebase");
async function getTasks(email) {
    try {
        const snapshot = await firebase_1.db.collection('tasks').where('email', '==', email).get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return {
            mensaje: 'Tareas obtenidas exitosamente',
            detalle: tasks.length ? tasks : null,
            status: 200
        };
    }
    catch (error) {
        throw new Error('Error al obtener las tareas: ' + error);
    }
}
async function addTask(task) {
    try {
        // Asignar fecha de creación si no se proporciona
        if (!task.createdAt) {
            task.createdAt = new Date().toISOString();
        }
        const newDoc = await firebase_1.db.collection('tasks').add(task);
        return {
            mensaje: 'Tarea agregada exitosamente',
            detalle: [{ id: newDoc.id }],
            status: 201
        };
    }
    catch (error) {
        return {
            mensaje: 'Tarea agregada exitosamente',
            detalle: [],
            status: 400
        };
    }
}
async function updateTask(taskId, taskData) {
    try {
        await firebase_1.db.collection('tasks').doc(taskId).update(taskData);
        const doc = await firebase_1.db.collection('tasks').doc(taskId).get();
        if (!doc.exists) {
            return {
                mensaje: 'Tarea no encontrada',
                detalle: null,
                status: 404
            };
        }
        const updatedTask = { id: doc.id, ...doc.data() };
        return {
            mensaje: 'Tarea actualizada exitosamente',
            detalle: [updatedTask],
            status: 200
        };
    }
    catch (error) {
        return {
            mensaje: 'Error al actualizar la tarea',
            detalle: [],
            status: 500, // 🔥 INTERNAL SERVER ERROR
        };
    }
}
async function deleteTask(taskId) {
    try {
        await firebase_1.db.collection('tasks').doc(taskId).delete();
        return {
            mensaje: 'Tarea eliminada exitosamente',
            detalle: null,
            status: 200
        };
    }
    catch (error) {
        return {
            mensaje: 'Error al eliminar la tarea',
            detalle: null,
            status: 400
        };
    }
}
