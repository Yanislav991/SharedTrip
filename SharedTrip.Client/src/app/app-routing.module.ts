import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './users/login-form/login-form.component';
import { RegisterFormComponent } from './users/register-form/register-form.component';
import { TripsComponent } from './trip/trips/trips.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotAuthGuard } from 'src/guards/not-auth.guard';
import { HomeComponent } from './core/home/home.component';
import { CreateTripComponent } from './trip/create-trip/create-trip.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate:[NotAuthGuard] },
  { path: 'register', component: RegisterFormComponent, canActivate:[NotAuthGuard] },
  { path: 'trips/all', component: TripsComponent, canActivate:[AuthGuard] },
  { path: 'trips/create', component: CreateTripComponent, canActivate:[AuthGuard] },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
