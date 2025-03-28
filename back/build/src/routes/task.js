"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareas = void 0;
// src/routes/task.ts
const express_1 = require("express");
const taskService_1 = require("./../services/taskService");
const router = (0, express_1.Router)();
//TODO: GET lista todas las tareas de un email.
router.get('/tasks', async (req, res, _next) => {
    try {
        const email = req.headers['email'];
        const result = await (0, taskService_1.getTasks)(email);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
//TODO: POST registra nueva tarea por email.
router.post('/tasks', async (req, res, _next) => {
    try {
        const taskData = req.body;
        // Se requieren título, descripción y el email asociado
        const result = await (0, taskService_1.addTask)(taskData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
//TODO: PUT actualiza datos de una tarea existente
router.put('/tasks/:taskId', async (req, res, _next) => {
    try {
        const { taskId } = req.params;
        const taskData = req.body;
        const result = await (0, taskService_1.updateTask)(taskId, taskData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
//TODO: DELETE elimina una tarea existente
router.delete('/tasks/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const result = await (0, taskService_1.deleteTask)(taskId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            detalle: null
        });
    }
});
exports.tareas = router;
