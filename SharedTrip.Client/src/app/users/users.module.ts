import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';



@NgModule({
  declarations: [ 
    LoginFormComponent, 
    RegisterFormComponent,
    ProfileComponent,
    UserInfoComponent,
    UserProfileEditComponent
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
