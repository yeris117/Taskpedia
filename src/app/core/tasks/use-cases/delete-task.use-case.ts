import { Injectable } from "@angular/core";
import { TaskRepository } from "../interfaces/task.repository";

@Injectable({providedIn:'root'})

export class DeleteTaskUseCase{

    constructor(private repository: TaskRepository)
    {
    
    }
    async execute(id : string): Promise<void>  {
        console.log('Eliminando tarea con ID:', id);
        return await this.repository.deleteTask(id);
     

    }
}