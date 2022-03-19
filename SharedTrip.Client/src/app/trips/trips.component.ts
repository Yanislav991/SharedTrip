import { Component, OnInit } from '@angular/core';
import { ITrip } from 'interfaces/ITrip';
import { TripsService } from 'services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  public tripsRecords!:Array<ITrip>;
  constructor(private trips: TripsService) { 
    trips.getAllTrips().subscribe(data=>{
      this.tripsRecords = data;
      console.log(this.tripsRecords)
    });
  }

  ngOnInit(): void {
    
  }


}
