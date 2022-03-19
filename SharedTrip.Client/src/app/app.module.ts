import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { TripsComponent } from './trips/trips.component'
import { TripsService } from 'services/trips.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterFormComponent,
    LoginFormComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, TripsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
