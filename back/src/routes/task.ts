// src/routes/task.ts
import { Router, Request, Response, NextFunction } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from './../services/taskService';
import { GenericResponse } from "../models/authResponse";
import { TaskModel } from '../models/TaskModel';

const router = Router();

//TODO: GET lista todas las tareas de un email.
router.get('/tasks', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const email = req.headers['email'] as string;

        const result: GenericResponse<TaskModel> = await getTasks(email);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});

//TODO: POST registra nueva tarea por email.
router.post('/tasks', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const taskData: TaskModel = req.body;
        // Se requieren título, descripción y el email asociado
        const result = await addTask(taskData);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});

//TODO: PUT actualiza datos de una tarea existente
router.put('/tasks/:taskId', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const taskData: Partial<TaskModel> = req.body;
        const result = await updateTask(taskId, taskData);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});

//TODO: DELETE elimina una tarea existente
router.delete('/tasks/:taskId', async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const result = await deleteTask(taskId);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});

export const tareas = router;