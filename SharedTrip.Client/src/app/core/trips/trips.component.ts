import { Component, ViewChild } from '@angular/core';
import { EmptyError } from 'rxjs';
import { ITrip } from 'src/interfaces/ITrip';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  @ViewChild('search') search:any;
  public tripsRecords!: Array<ITrip>;
  public recordsPages!: Array<number>;
  private data!: Array<ITrip>
  private recordsPerPage: number = 5;
  private page = {
    start: 0,
    end: this.recordsPerPage
  }
  private currentSort = {
    field: "",
    order: ""
  }

  constructor(private trips: TripsService) {
    this.loadData();
  }
  

  onKey(event: any) {
    this.data = this.filterByValue(this.data, event.target?.value)
    this.tripsRecords = this.applyPaging(this.page.start, this.page.end);
    this.populatePages();
  }
  refresh(){
    this.search.nativeElement.value = ' '
    this.loadData();
  }
  filterByValue(array:any, value:any) {
    return array.filter((data:any) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  sortData(event: MouseEvent) {
    let element = event.target as HTMLElement;
    let sortTerm = this.lowerFirstLetter(this.camalize(element.textContent!)).trim();
    if (this.currentSort.field == "") {
      this.currentSort.field = sortTerm;
      this.currentSort.order = "asc"
      //@ts-ignore
      this.data.sort((a, b) => (a[sortTerm] < b[sortTerm]) ? -1 : 1);
    }
    else if (this.currentSort.field == sortTerm && this.currentSort.order == "asc") {
      this.currentSort.order = "desc"
      //@ts-ignore
      this.data.sort((a, b) => (a[sortTerm] < b[sortTerm]) ? 1 : -1);
    }
    else if (this.currentSort.field == sortTerm && this.currentSort.order == "desc") {
      this.currentSort.field = '';
      this.currentSort.order = '';
      this.loadData()
    }

    this.tripsRecords = this.applyPaging(this.page.start, this.page.end);

  }
  loadData() {
    this.trips.getAllTrips().subscribe(data => {
      this.data = data;
      this.tripsRecords = data.slice(0, this.recordsPerPage);
      this.recordsPages = [];
      this.populatePages();
    });
  }

  onPageClick(event: MouseEvent) {
    let currentPage = (event.currentTarget as HTMLElement).getAttribute('data-page');
    this.tripsRecords = this.applyPaging((Number(currentPage) - 1) * Number(this.recordsPerPage), Number(this.recordsPerPage) * Number(currentPage));
  }
  applyPaging(start: number, end: number) {
    this.page.start = start;
    this.page.end = end;
    return this.data.slice(start, end);
  }
  lowerFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  camalize(str: string) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
  populatePages() {
    this.recordsPages = [];
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
