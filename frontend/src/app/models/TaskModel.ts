export interface TaskModel {
    id?: string;
    title: string;
    description: string;
    createdAt?: string;
    completed: boolean;
    email: string; // Correo asociado al registro
  }