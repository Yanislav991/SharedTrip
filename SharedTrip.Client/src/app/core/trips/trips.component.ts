import { Component} from '@angular/core';
import { ITrip } from 'src/interfaces/ITrip';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  public tripsRecords!: Array<ITrip>;
  public recordsPages!: Array<number>;
  private data!: Array<ITrip>
  private recordsPerPage:number = 5;

  constructor(private trips: TripsService) {
    trips.getAllTrips().subscribe(data => {
      this.data = data;
      this.tripsRecords = data.slice(0, this.recordsPerPage);
      this.recordsPages = [];
      this.populatePages(this.recordsPages);
    });
  }

  pageHandler(event:MouseEvent){
    var currentPage = (event.currentTarget as HTMLElement).getAttribute('data-page');
    this.tripsRecords = this.data.slice((Number(currentPage)-1)*Number(this.recordsPerPage), Number(this.recordsPerPage)*Number(currentPage));
  }
  populatePages(recordsPages: Array<number>) {
    let counter = 1;
    this.recordsPages.push(counter);
    for (let i = 1; i <= this.tripsRecords.length; i++) {
      if (i % 5 == 0) {
        counter++
        this.recordsPages.push(counter++);
      }
    }
  }

}
