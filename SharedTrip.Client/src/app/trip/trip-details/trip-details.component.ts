import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from 'src/interfaces/ITrip';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  private currTrip!: ITrip;
  constructor(private trips: TripsService, private ar: ActivatedRoute) {
    this.ar.params.subscribe(p => {
      let id = p['id'];
      this.trips.getTripById(id).subscribe(s=>{
        console.log(s)
      })
    })
  }

  ngOnInit(): void {
  }

}
