import { onRequest } from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";

import express, { Request, Response } from "express";
import { GenericResponse } from "./models/authResponse";
import { EmailModel } from "./models/EmailModel";
import { loginService, registerService } from "./service/authService";
import { TaskModel } from "./models/TaskModel";
import { addTask, deleteTask, getTasks, updateTask } from "./service/taskService";
//import {loginService, registerService} from "./service/authService";
//import {GenericResponse} from "./models/authResponse";
//import {EmailModel} from "./models/EmailModel";
//import {TaskModel} from "./models/TaskModel";
//import {addTask, deleteTask, getTasks, updateTask} from "./service/taskService";


const app = express();

app.get("/", async (_req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
})

// TODO: login
app.get("/users/:email", async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        console.log(email);

        // Llamar al servicio de login
        const result: GenericResponse<EmailModel> = await loginService(email);

        res.status(result.status).json(result);
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});



// TODO: Registrar un nuevo usuario
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        console.log(email);
        const result = await registerService(email);

        res.status(result.status).json(result);
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});

//* *******************************
// TASKS
//* *******************************/


// TODO: GET lista todas las tareas de un email.
app.get("/tasks", async (req: Request, res: Response) => {
    try {
        const email = req.headers["email"] as string;

        const result: GenericResponse<TaskModel> = await getTasks(email);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});

// TODO: POST registra nueva tarea por email.
app.post("/tasks", async (req: Request, res: Response) => {
    try {
        const taskData: TaskModel = req.body;
        // Se requieren título, descripción y el email asociado
        const result = await addTask(taskData);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});

// TODO: PUT actualiza datos de una tarea existente
app.put("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const taskData: Partial<TaskModel> = req.body;
        const result = await updateTask(taskId, taskData);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});

// TODO: DELETE elimina una tarea existente
app.delete("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const result = await deleteTask(taskId);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error interno del servidor",
            detalle: null,
        });
    }
});
export const api = onRequest(app);
