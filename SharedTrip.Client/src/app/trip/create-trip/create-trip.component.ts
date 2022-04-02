import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  createTripForm: FormGroup;
  constructor(private fb: FormBuilder,private shared:SharedService, private trips: TripsService, private router: Router) {
    this.createTripForm = this.fb.group({
      'startPoint': [[''], [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'endPoint': [[''], [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'date': [[''], [Validators.required]],
      'freeSeats': [[''], [Validators.required, Validators.min(1), Validators.max(8)]],
      'placeForLuggage': [[''], [Validators.required]],
      'price': [''],
      'carImageUrl': [[''], [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      'description': [[''], [Validators.required, Validators.minLength(15), Validators.maxLength(300)]]
    })
  }

  ngOnInit(): void {
    this.createTripForm.get('placeForLuggage')!.setValue(false);
  }
  createTrip() {
    console.log(this.createTripForm.get('placeForLuggage'))
    if(!this.createTripForm.valid){
      this.shared.fireValidation(this.createTripForm);
      return;
    }
    this.trips.create(this.createTripForm.value).subscribe(s => {
      console.log(s);
    })
  }

  get startPoint() {
    return this.createTripForm.get('startPoint');
  }
  get endPoint() {
    return this.createTripForm.get('endPoint');
  }
  get date() {
    return this.createTripForm.get('date');
  }
  get freeSeats() {
    return this.createTripForm.get('freeSeats');
  }
  get carImageUrl() {
    return this.createTripForm.get('carImageUrl');
  }
  get description() {
    return this.createTripForm.get('description');
  }


}
