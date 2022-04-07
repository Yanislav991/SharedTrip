import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ 
    LoginFormComponent, 
    RegisterFormComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginFormComponent, 
    RegisterFormComponent,
    ProfileComponent
  ]
})
export class UsersModule { }
