import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantManagementComponent } from './merchant-management/merchant-management.component';
import { MerchantListComponent } from './merchant-management/merchant-list/merchant-list.component';
import { OnboardingMerchantComponent } from './merchant-management/onboarding-merchant/onboarding-merchant.component';
import { ModifyMerchantComponent } from './merchant-management/modify-merchant/modify-merchant.component';
import { ContractCreationComponent } from './contract-creation/contract-creation.component';
import { ContractListComponent } from './contract-creation/contract-list/contract-list.component';
import { AddContractComponent } from './contract-creation/add-contract/add-contract.component';
import { ModifyContractComponent } from './contract-creation/modify-contract/modify-contract.component';
import { CasesExceptionsComponent } from './cases-exceptions/cases-exceptions.component';
import { CaseExceptionListComponent } from './cases-exceptions/case-exception-list/case-exception-list.component';
import { SolveCaseExceptionComponent } from './cases-exceptions/solve-case-exception/solve-case-exception.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { ModifyUserComponent } from './user-management/modify-user/modify-user.component';
import { SettingsComponent } from './settings/settings.component';
import { BusinessSettingsComponent } from './settings/business-settings/business-settings.component';
import { MyAccountComponent } from './settings/my-account/my-account.component';
import { AuthGuard } from '../authentication/auth.guard.service';
import { RoleGuard } from '../authentication/auth.role-guard.service';
import {CdfTypesComponent} from "./settings/business-settings/cdf-types/cdf-types.component";
import {SettlementTypesComponent} from "./settings/business-settings/settlement-types/settlement-types.component";
import {FeesTypesComponent} from "./settings/business-settings/fees-types/fees-types.component";
import {CurrenciesComponent} from "./settings/business-settings/currencies/currencies.component";
import {FeesPercentagesComponent} from "./settings/business-settings/fees-percentages/fees-percentages.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'merchant-management',
    component: MerchantManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual', 'ROLE_special'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MerchantListComponent },
      { path: 'add', component: OnboardingMerchantComponent },
      { path: 'modify/:id', component: ModifyMerchantComponent }
    ]
  },
  {
    path: 'contract-creation',
    component: ContractCreationComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual', 'ROLE_special'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContractListComponent },
      { path: 'add', component: AddContractComponent },
      { path: 'modify/:id', component: ModifyContractComponent }
    ]
  },
  {
    path: 'cases-exceptions',
    component: CasesExceptionsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CaseExceptionListComponent },
      { path: 'solve/:id', component: SolveCaseExceptionComponent }
    ]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_adminSystem', 'ROLE_admin'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UserListComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'modify/:id', component: ModifyUserComponent }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual', 'ROLE_special'] },
    children: [
      { path: '', redirectTo: 'business-settings', pathMatch: 'full' },
      {
        path: 'business-settings',
        component: BusinessSettingsComponent,
        children: [
          { path: '', redirectTo: 'fees-percentages', pathMatch: 'full' },
          { path: 'fees-percentages', component: FeesPercentagesComponent },
          { path: 'currencies', component: CurrenciesComponent },
          { path: 'fees-types', component: FeesTypesComponent },
          { path: 'settlement-types', component: SettlementTypesComponent },
          { path: 'cdf-types', component: CdfTypesComponent }
        ]
      },
      { path: 'my-account', component: MyAccountComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes),DashboardComponent],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
