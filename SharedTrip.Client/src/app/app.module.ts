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
import { MyTripGuard } from 'src/guards/my-trip.guard';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    UsersModule,
    FormsModule,
    TripModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TripsService,
    AuthGuard,
    NotAuthGuard,
    MyTripGuard],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
