import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";
import { Task } from "src/app/core/tasks/entities/task";
import { TaskRepository } from "src/app/core/tasks/interfaces/task.repository";
import { HttpClient } from '@angular/common/http';

const COLLECTION = 'TASK';

@Injectable({ providedIn: 'root' })
export class TaskStorageService implements TaskRepository {
  

  

  async createTask(task: Task): Promise<any> {
    return await Preferences.set({
      key: `${COLLECTION} - ${task.id}`, value: JSON.stringify(task)
    });
  }


/* 
@Injectable({ providedIn: 'root' })
export class TaskStorageService implements TaskRepository {
  async createTask(task: Task): Promise<any> {
    return await Preferences.set({
    key: `${COLLECTION} - ${task.id}`, value: JSON.stringify(task)
  });
  } */

  async getTask(): Promise<Task[]> {
    const collection = await Preferences.keys();
    const tasks: Task[] = [];

    for (const key of collection.keys) {
      if (key.startsWith(COLLECTION)) {
        const data = (await Preferences.get({ key })).value;
        if (data) tasks.push(JSON.parse(data));
      }
    }

    return tasks;
  }

  async getTaskByID(taskid: string): Promise<Task | null> {
    const data = (await Preferences.get({ key: `${COLLECTION} - ${taskid}` })).value;
    return data ? JSON.parse(data) : null;
  }

  async updateTask(task: Task): Promise<Task> {
    const id = task.id;
    const existingTask = await this.getTaskByID(id);
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found.`);
    }
    await Preferences.set({
      key: `${COLLECTION} - ${id}`,
      value: JSON.stringify(task),
    });
    return task;
  }

    // Implementa la lógica para actualizar una tarea por ID
  

  async deleteTask(id: string): Promise<void> {
    // Implementa la lógica para eliminar una tarea por ID
  await Preferences.remove({key:  `${COLLECTION} - ${id}` });
  }
}
