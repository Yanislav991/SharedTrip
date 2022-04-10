import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITrip } from 'src/interfaces/ITrip';
import { AuthService } from 'src/services/auth.service';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  public currTrip!: ITrip;
  public isOwner!: Boolean;
  constructor(private trips: TripsService, private ar: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.ar.params.subscribe(p => {
      let id = p['id'];
      this.trips.getTripById(id).subscribe({
        next: (trip) => {
          this.currTrip = trip;
          this.auth.isOwner(this.currTrip.id.toString()).then(x => {
            this.isOwner = x.isOwner
          })
        },
        error: (err) => { alert("Application problem!") }
      })
    })
  }

  deleteTrip() {
    if (this.isOwner) {
      this.trips.delete(this.currTrip.id).subscribe(s => {
        if (s.status == "Success") {
          alert("Deleted successfuly!");
          this.router.navigate(['/trips/all'])
        }
      });
    } else {
      alert("You cannot delete this Trip since you're not its creator!");
      this.router.navigate(['/trips/all'])
    }
  }
  get isDataLoaded() {
    return this.currTrip != null;
  }
}
