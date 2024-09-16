import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { SharedModule } from '../shared/shared.module';
import {MerchantManagementComponent} from "./merchant-management/merchant-management.component";
import {ContractCreationComponent} from "./contract-creation/contract-creation.component";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MyAccountComponent} from "./settings/my-account/my-account.component";


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MyAccountComponent,
    MerchantManagementComponent,
    ContractCreationComponent,
  ],
  declarations: [],
})
export class AdminModule { }
