// src/routes/task.ts
import { Router, Request, Response, NextFunction } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from './../services/taskService';
import { GenericResponse } from "../models/authResponse";
import { TaskModel } from '../models/TaskModel';

const router = Router();

//TODO: GET lista todas las tareas de un email.
router.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.headers['email'] as string;
        if (!email) {
            return res.status(400).json({
                mensaje: 'Se requiere un correo electrónico para filtrar las tareas',
                detalle: null,
            });
        }
        const result: GenericResponse<TaskModel> = await getTasks(email);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        next(error);
    }
});

//TODO: POST registra nueva tarea por email.
router.post('/tasks', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskData: TaskModel = req.body;
        // Se requieren título, descripción y el email asociado
        if (!taskData.title || !taskData.description || !taskData.email) {
            return res.status(400).json({
                mensaje: 'Se requieren título, descripción y correo electrónico',
                detalle: null,
            });
        }
        const result = await addTask(taskData);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error al agregar tarea:', error);
        next(error);
    }
});

//TODO: PUT actualiza datos de una tarea existente
router.put('/tasks/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const taskData: Partial<TaskModel> = req.body;
        if (!taskId) {
            return res.status(400).json({
                mensaje: 'Se requiere el ID de la tarea',
                detalle: null,
            });
        }
        const result = await updateTask(taskId, taskData);
        if (result.detalle === null) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        next(error);
    }
});

//TODO: DELETE elimina una tarea existente
router.delete('/tasks/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        if (!taskId) {
            return res.status(400).json({
                mensaje: 'Se requiere el ID de la tarea',
                detalle: null,
            });
        }
        const result = await deleteTask(taskId);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        next(error);
    }
});

export const tareas = router;