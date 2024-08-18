import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantManagementComponent } from './merchant-management/merchant-management.component';
import { MerchantListComponent } from './merchant-management/merchant-list/merchant-list.component';
import { AddMerchantComponent } from './merchant-management/add-merchant/add-merchant.component';
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
import { CurrenciesManagementComponent } from './settings/currencies-management/currencies-management.component';
import { CurrencyListComponent } from './settings/currencies-management/currency-list/currency-list.component';
import { AddCurrencyComponent } from './settings/currencies-management/add-currency/add-currency.component';
import { ModifyCurrencyComponent } from './settings/currencies-management/modify-currency/modify-currency.component';
import { FeesManagementComponent } from './settings/fees-management/fees-management.component';
import { FeeListComponent } from './settings/fees-management/fee-list/fee-list.component';
import { AddFeeComponent } from './settings/fees-management/add-fee/add-fee.component';
import { ModifyFeeComponent } from './settings/fees-management/modify-fee/modify-fee.component';
import { AuthGuard } from '../authentication/auth.guard.service';
import { RoleGuard } from '../authentication/auth.role-guard.service';

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
      { path: '',
        redirectTo: 'list',
        pathMatch: 'full'

      },
      { path: 'list',
        component: MerchantListComponent
        ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual', 'ROLE_special'] }
        ,canActivate: [AuthGuard, RoleGuard]
      }
      ,
      { path: 'add',
        component: AddMerchantComponent
        ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
        ,canActivate: [AuthGuard, RoleGuard]
      },
      { path: 'modify/:id',
        component: ModifyMerchantComponent
        ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
        ,canActivate: [AuthGuard, RoleGuard]
      }
    ]
  },
  {
    path: 'contract-creation',
    component: ContractCreationComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual'] },
    children: [
      { path: '',
        redirectTo: 'list',
        pathMatch: 'full'

      },
      { path: 'list', component: ContractListComponent },
      { path: 'add', component: AddContractComponent ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
        ,canActivate: [AuthGuard, RoleGuard]},
      { path: 'modify/:id', component: ModifyContractComponent ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
        ,canActivate: [AuthGuard, RoleGuard]}
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
    data: { roles: ['ROLE_adminSystem'] },
    children: [
      { path: '',
        redirectTo: 'list',
        pathMatch: 'full' },
      { path: 'list',
        component: UserListComponent },
      { path: 'add',
        component: AddUserComponent },
      { path: 'modify/:id',
        component: ModifyUserComponent }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
    ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem', 'ROLE_casual', 'ROLE_special'] }
    ,canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: '',
        redirectTo: 'business-settings',
        pathMatch: 'full' },
      { path: 'business-settings',
        component: BusinessSettingsComponent },
      { path: 'my-account',
        component: MyAccountComponent },
      {
        path: 'currencies-management',
        component: CurrenciesManagementComponent
      ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
,canActivate: [AuthGuard, RoleGuard],
        children: [
          { path: '', redirectTo: 'list',
            pathMatch: 'full' },
          { path: 'list',
            component: CurrencyListComponent },
          { path: 'add',
            component: AddCurrencyComponent },
          { path: 'modify/:id',
            component: ModifyCurrencyComponent }
        ]
      },
      {
        path: 'fees-management',
        component: FeesManagementComponent,
        children: [
          { path: '',
            redirectTo: 'list',
            pathMatch: 'full' },
          { path: 'list',
            component: FeeListComponent },
          { path: 'add',
            component: AddFeeComponent },
          { path: 'modify/:id',
            component: ModifyFeeComponent }
        ]
        ,data: { roles: ['ROLE_admin', 'ROLE_adminSystem'] }
        ,canActivate: [AuthGuard, RoleGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),DashboardComponent],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
