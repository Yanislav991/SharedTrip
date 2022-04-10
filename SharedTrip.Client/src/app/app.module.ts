import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TripsService } from 'src/services/trips.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotAuthGuard } from 'src/guards/not-auth.guard';
import { TripModule } from './trip/trip.module';
import { MyTripGuard } from 'src/guards/my-trip.guard';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from 'src/services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
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
    MyTripGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
