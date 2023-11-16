import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { GetTaskUseCase } from '../core/tasks/use-cases/get-task.use-case';
import { CreateTaskUseCase } from '../core/tasks/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../core/tasks/use-cases/delete-task.use-case';

interface tarea{
  id: string;
  nombre: string;
  descripcion: string;
  prioridad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;
  tareas: any[] =[];
  
  tareaEditada: tarea | null = null; 
  nombre: string = "";
  descripcion: string = "";
  prioridad: string="";



  constructor(
    private modalController: ModalController,
    private getTasksUseCase: GetTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async ngOnInit (){
    this.tareas = (await this.getTasksUseCase.execute());
  }


  Cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  Confirm() {
    if (this.tareaEditada) {
      this.tareaEditada.nombre = this.nombre;
      this.tareaEditada.descripcion = this.descripcion;
      this.tareaEditada.prioridad = this.prioridad;
    } else {
      const uid = new Date().toISOString();
      const tarea = {
        id: uid,
        nombre: this.nombre,
        descripcion: this.descripcion,
        prioridad: this.prioridad
      };
  
      //this.tareas.push(tarea);
      this.create()
    }
  
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.tareaEditada = null;
  
    this.modal.dismiss(null, 'confirm');
  }
  
  
  eliminarTareas(item: any) {
    const index = this.tareas.indexOf(item);
    this.tareas.splice(index,1);
  }



  editarTareas(item: tarea) {
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
  }

  private async create (){
    await this.createTaskUseCase.execute(this.nombre, this.descripcion, this.prioridad);
    this.tareas = (await this.getTasksUseCase.execute());
  }

  
  async deleteTask(id: string){
    this.deleteTaskUseCase.execute(id);
            
  }

 /*  private async update (){
    await this.updateTask.execute(this.task);
  } */
  
}
