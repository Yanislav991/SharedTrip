import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITrip } from 'src/interfaces/ITrip';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  public currTrip!: ITrip;
  private routeSub!: Subscription;
  private tripFetcSub!: Subscription;
  constructor(private trips: TripsService, private ar: ActivatedRoute) {
    this.routeSub = this.ar.params.subscribe(p => {
      let id = p['id'];
      this.tripFetcSub = this.trips.getTripById(id).subscribe(trip => {
        this.currTrip = trip;
      })
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.tripFetcSub.unsubscribe();
  }

}
