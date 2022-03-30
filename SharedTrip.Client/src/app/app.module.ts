import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TripsService } from 'src/services/trips.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotAuthGuard } from 'src/guards/not-auth.guard';
import { TripModule } from './trip/trip.module';
import { CreateTripComponent } from './trip/create-trip/create-trip.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    UsersModule,
    TripModule,
    HttpClientModule
  ],
  providers: [AuthService, TripsService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
