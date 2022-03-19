import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'trips', component: TripsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
