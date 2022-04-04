import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrip } from 'src/interfaces/ITrip';
import { SharedService } from 'src/services/shared.service';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  editTripForm: FormGroup;
  editModel!: ITrip
  constructor(private fb: FormBuilder, private shared: SharedService, private trips: TripsService, private ar: ActivatedRoute, private router: Router) {
    this.editTripForm = this.fb.group({
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
    this.ar.params.subscribe(p => {
      let id = p['id'];
      this.trips.getTripById(id).subscribe(trip => {
        this.editModel = trip;
        this.populateForm(this.editModel)
      })
    })
  }
  editTrip() {
    if(!this.editTripForm.valid){
      this.shared.fireValidation(this.editTripForm);
      alert("InvalidForm")
      return;
    }
    let data = this.editTripForm.value;
    data.id = this.editModel.id;
    this.trips.edit(data).subscribe(s=>{
      if(s.status == "Success"){
        this.router.navigate(['/trips/all'])
      }
    })
  }
  populateForm(model: ITrip) {
    Object.keys(model).forEach(prop => {
      if (prop == 'date') {
        this.editTripForm.get(prop)?.setValue(new Date(model['date']).toISOString().split('T')[0]);
      } else {
        this.editTripForm.get(prop)?.setValue(model[prop])
      }
    })
  }
  get startPoint() {
    return this.editTripForm.get('startPoint');
  }
  get endPoint() {
    return this.editTripForm.get('endPoint');
  }
  get date() {
    return this.editTripForm.get('date');
  }
  get freeSeats() {
    return this.editTripForm.get('freeSeats');
  }
  get carImageUrl() {
    return this.editTripForm.get('carImageUrl');
  }
  get description() {
    return this.editTripForm.get('description');
  }
}
