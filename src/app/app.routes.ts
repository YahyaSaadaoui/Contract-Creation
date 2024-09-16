import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './authentication/auth.guard.service';
import { RoleGuard } from './authentication/auth.role-guard.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MerchantListComponent} from "./admin/merchant-management/merchant-list/merchant-list.component";
import {OnboardingMerchantComponent} from "./admin/merchant-management/onboarding-merchant/onboarding-merchant.component";
import {ModifyMerchantComponent} from "./admin/merchant-management/modify-merchant/modify-merchant.component";
import {ContractListComponent} from "./admin/contract-creation/contract-list/contract-list.component";
import {AddContractComponent} from "./admin/contract-creation/add-contract/add-contract.component";
import {ModifyContractComponent} from "./admin/contract-creation/modify-contract/modify-contract.component";
import {AuthResolverService} from "./authentication/AuthResolverService";
import {UserManagementComponent} from "./admin/user-management/user-management.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard', // Redirect to dashboard if authenticated
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authRequired: false }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { authRequired: false }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    resolve: { auth: AuthResolverService }
  },
  { path: 'merchants', component: MerchantListComponent },
  { path: 'onboarding-merchant', component: OnboardingMerchantComponent },
  { path: 'modify-merchant/:id', component: ModifyMerchantComponent },
  { path: '', redirectTo: '/merchants', pathMatch: 'full' },
  { path: 'contract-list', component: ContractListComponent },
  { path: 'add-contract', component: AddContractComponent },
  { path: 'modify-contract/:id', component: ModifyContractComponent },
  { path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'user-management', component: UserManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };
