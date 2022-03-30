import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  createTripForm:FormGroup;
  constructor(private fb:FormBuilder,private trips:TripsService, private router:Router) {
    this.createTripForm = this.fb.group({
      'startPoint':[''],
      'endPoint':[''],
      'date':[''],
      'freeSeats':[''],
      'placeForLuggage':[''],
      'price':[''],
      'carImageUrl':[''],
      'description':['']
    })
   }

  ngOnInit(): void {
  }
  createTrip(){
    this.trips.create(this.createTripForm.value).subscribe(s=>{
      console.log(s.data);
    })
  }

}
