import { Injectable } from "@angular/core";
import { TaskRepository } from "../interfaces/task.repository";
import { Task } from "../entities/task";

@Injectable({providedIn:'root'})

export class GetTaskUseCase{

    constructor(private repository: TaskRepository)
    {
    
    }
    async execute(): Promise<Task[]>  {
        
        const task = await this.repository.getTask();
        return task; 

    }
}