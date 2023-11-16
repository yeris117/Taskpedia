import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskRepository } from './core/tasks/interfaces/task.repository';
import { TaskStorageService } from './core/tasks/service/task-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TrelloService } from './core/tasks/trello.service';
import { TokenInterceptorService } from './core/tasks/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              {provide: TaskRepository, useClass: TrelloService},
              {provide: HTTP_INTERCEPTORS, useClass:  TokenInterceptorService, multi: true}],
              
              
  bootstrap: [AppComponent],
})
export class AppModule {}
