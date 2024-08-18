import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ],
  declarations: [],
})
export class AdminModule { }
