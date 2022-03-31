import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { BooleanPipe } from 'src/pipes/boolean.pipe';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TripDetailsComponent } from './trip-details/trip-details.component';



@NgModule({
  declarations: [
    TripsComponent,
    CreateTripComponent,
    BooleanPipe,
    TripDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    TripsComponent
  ]
})
export class TripModule { }
