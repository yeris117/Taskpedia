import { Task } from "../entities/task";



export abstract class TaskRepository{

    abstract createTask(task: Task): Promise<void>;
    abstract getTask(): Promise<Task[]> ;
    abstract getTaskByID(id: String): Promise<Task | null >;
    abstract updateTask(task: Task):  Promise<Task>;
    abstract deleteTask(id: string):  Promise<void>;
}