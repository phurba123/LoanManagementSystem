import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    NewUserComponent,
    ForgotComponent,
    LogoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
