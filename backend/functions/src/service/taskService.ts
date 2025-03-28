// src/services/taskService.ts
import { db } from './../config/firebase';
import { GenericResponse } from './../models/authResponse';
import { TaskModel } from './../models/TaskModel';

export async function getTasks(email: string): Promise<GenericResponse<TaskModel>> {
    try {
        const snapshot = await db.collection('tasks').where('email', '==', email).get();
        const tasks: TaskModel[] = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() } as TaskModel);
        });
        return {
            mensaje: 'Tareas obtenidas exitosamente',
            detalle: tasks.length ? tasks : null,
            status: 200
        };
    } catch (error) {
        throw new Error('Error al obtener las tareas: ' + error);
    }
}

export async function addTask(task: TaskModel): Promise<GenericResponse<{ id: string }>> {
    try {
        // Asignar fecha de creación si no se proporciona
        if (!task.createdAt) {
            task.createdAt = new Date().toISOString();
        }

        const newDoc = await db.collection('tasks').add(task);
        return {
            mensaje: 'Tarea agregada exitosamente',
            detalle: [{ id: newDoc.id }],
            status: 201
        };
    } catch (error) {
        return {
            mensaje: 'Tarea agregada exitosamente',
            detalle: [],
            status: 400
        };
    }
}

export async function updateTask(taskId: string, taskData: Partial<TaskModel>): Promise<GenericResponse<TaskModel>> {
    try {
        await db.collection('tasks').doc(taskId).update(taskData);
        const doc = await db.collection('tasks').doc(taskId).get();
        if (!doc.exists) {
            return {
                mensaje: 'Tarea no encontrada',
                detalle: null,
                status: 404
            };
        }
        const updatedTask: TaskModel = { id: doc.id, ...doc.data() } as TaskModel;
        return {
            mensaje: 'Tarea actualizada exitosamente',
            detalle: [updatedTask],
            status: 200
        };
    } catch (error) {
        return {
            mensaje: 'Error al actualizar la tarea',
            detalle: [],
            status: 500, // 🔥 INTERNAL SERVER ERROR
        };
    }
}

export async function deleteTask(taskId: string): Promise<GenericResponse<null>> {
    try {
        await db.collection('tasks').doc(taskId).delete();
        return {
            mensaje: 'Tarea eliminada exitosamente',
            detalle: null,
            status: 200
        };
    } catch (error) {
        return {
            mensaje: 'Error al eliminar la tarea',
            detalle: null,
            status: 400
        };
    }
}