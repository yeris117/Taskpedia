import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { TaskRepository } from "../interfaces/task.repository";


@Injectable({providedIn:'root'})

export class UpdateTaskUseCase{
    constructor(private repository: TaskRepository) {}

    // EditTaskUseCase.ts
   async execute(taskId: string, nombre: string, descripcion: string, prioridad: string): Promise<Task | null> {
     // Obtener la tarea existente
     const existingTask = await this.repository.getTaskByID(taskId);
   
     // Verificar si la tarea existe
     if (existingTask) {
       // Realizar la actualización de propiedades
       existingTask.nombre = nombre;
       existingTask.descripcion = descripcion;
   
       try {
         // Llamar al método de actualización en el repositorio
         const updatedTask = await this.repository.updateTask(existingTask);
   
         // Devolver la tarea actualizada
         return updatedTask;
       } catch (error) {
         // Manejar cualquier error que pueda ocurrir durante la actualización
         console.error('Error al actualizar la tarea:', error);
         throw error;
       }
     } else {
       // La tarea no existe, puedes manejar este caso según tus necesidades
       console.error('La tarea no existe.');
       return null;
     }
   }
   }