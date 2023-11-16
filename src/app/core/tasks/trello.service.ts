import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskRepository } from './interfaces/task.repository';
import { Task } from 'src/app/core/tasks/entities/task';


const API_URL = 'https://api.trello.com/1/';
const API_TOKEN = 'ATTAcbe30b18cd7d318266afbaf98c79637f58128685e0925e5b3b4c477c12964d87C208A7D8';
const API_KEY = '795354887bd59a6ef7fccf174ad0fe32';
const ID_LIST = '653a424026ea85456b292cbb';
const ID_PROCESO = '653a424026ea85456b292cbc';
const ID_HECHO = '653a424026ea85456b292cbd';


@Injectable({
  providedIn: 'root',
})
export class TrelloService implements TaskRepository{                         

  constructor(private http: HttpClient) {}

  async getTaskByID(taskid: String): Promise<Task | null> {
    throw new Error('Method not implemented.');
  }

  async createTask(task: Task): Promise<any> {
    let ListID = ID_LIST;

    if(task.prioridad === "media")
      ListID = ID_PROCESO;
    else if(task.prioridad === "alta")
      ListID = ID_HECHO;      
  
    const data = {
      idList: ListID,
      name: task.nombre,
      desc: task.descripcion,
      // Puedes agregar la prioridad como un campo personalizado, un comentario, etc., dependiendo de cómo quieras manejarlo en Trello
    };
  
    const url = `${API_URL}cards?key=${API_KEY}&token=${API_TOKEN}`;
    const response: any = await this.http.post(url, data).toPromise();
    
    if (response && response.id) {
      let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
      tasks.push({
        id: response.id,
        nombre: task.nombre,
        descripcion: task.descripcion,
        prioridad: task.prioridad, // Usa la prioridad asignada
        estado: true, // Puedes asignar el estado que corresponda
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      throw new Error('No se pudo crear la tarea en Trello.');
    }
  }
  




  async getTask(): Promise<Task[]> {
    const url = `${API_URL}lists/${ID_LIST}/cards?key=${API_KEY}&token=${API_TOKEN}`;
    const response: any = await this.http.get(url).toPromise();
  
    // Convierte las tarjetas de Trello en tareas
    const tasks: Task[] = response.map((card: any) => ({
      id: card.id,
      nombre: card.name,
      descripcion: card.desc,
      prioridad: this.getPrioridad(card.idList), // Puedes asignar la prioridad que corresponda
      estado: true, // Puedes asignar el estado que corresponda
    }));
  
    return tasks;
  }

  private getPrioridad(id: string): string {
    if(id === ID_HECHO)
      return "alta";
    else if(id === ID_PROCESO)
      return "media";
    else
      return "baja";
  }

  /* async getTask(): Promise<Task[]> {
    const data = await this.http.get(API_URL + 'cards').toPromise();

    if(Array.isArray(data)) {
      
      const list: Task[] = data.map(card => ({
        id: card.id,
        nombre: card.name,
        descripcion: card.desc,
        prioridad: 'ALTA',
        estado: true 
      }));
      return list;
    }
    throw new Error('Method not implemented.');
  } */

  
  async getTaskById(id: string): Promise<Task | null> {
    const url = `${API_URL}cards/${id}?key=${API_KEY}&token=${API_TOKEN}`;
    try {
      const response: any = await this.http.get(url).toPromise();
      if (response) {
        return {
          id: response.id,
          nombre: response.name,
          descripcion: response.desc,
          prioridad: 'ALTA',
          estado: true,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la tarea por ID:', error);
      return null;
      }
    }

  async updateTask(task: Task): Promise<Task> {
    const url = `${API_URL}cards/${task.id}?key=${API_KEY}&token=${API_TOKEN}`;
    const data = {
      name: task.nombre,
      desc: task.descripcion,
    };
  
    try {
      const response: any = await this.http.put(url, data).toPromise();
  
      if (response && response.id) {
        // Actualiza la tarea en el almacenamiento local si es necesario
        let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
        const index = tasks.findIndex(t => t.id === task.id);
  
        if (index !== -1) {
          tasks[index] = {
            id: response.id,
            nombre: task.nombre,
            descripcion: task.descripcion,
            prioridad: 'ALTA',
            estado: true,
          };
  
          // Actualiza el almacenamiento local con las tareas modificadas
          localStorage.setItem('tasks', JSON.stringify(tasks));
  
          // Retorna la tarea modificada
          return tasks[index];
        }
      }
  
      // Si no se pudo actualizar la tarea en Trello
      console.error('No se pudo actualizar la tarea en Trello:', response);
      throw new Error('No se pudo actualizar la tarea en Trello.');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error;
    }
  }  
  
  

  async deleteTask(id: string): Promise<any> {
    const url = `https://api.trello.com/1/cards/${id}?key=795354887bd59a6ef7fccf174ad0fe32&token=ATTAcbe30b18cd7d318266afbaf98c79637f58128685e0925e5b3b4c477c12964d87C208A7D8`;
    const response = await this.http.delete(url).toPromise();

  if (response) {
    // La tarjeta se eliminó con éxito
  } else {
    throw new Error('No se pudo eliminar la tarea');
  }
  }
  }