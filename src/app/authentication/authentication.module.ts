
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';   
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    LoginComponent,
    RegisterComponent
  ],
  exports: [LoginComponent]
})
export class AuthenticationModule { }
