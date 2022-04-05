import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ITrip } from 'src/interfaces/ITrip';
import { TripsService } from 'src/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit{
  @ViewChild('search') search: any;
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

  constructor(private trips: TripsService, private router: Router) {
  }
  ngOnInit(): void {
    this.loadData();
  }

  onKey(event: any) {
    this.data = this.filterByValue(this.data, event.target?.value)
    this.tripsRecords = this.applyPaging(this.page.start, this.page.end);
    this.populatePages();
  }
  refresh() {
    this.search.nativeElement.value = ' '
    this.loadData();
  }
  filterByValue(array: any, value: any) {
    return array.filter((data: any) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
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
    }
    else if (this.currentSort.field != sortTerm && this.currentSort.field != "") {
      //@ts-ignore
      this.data.sort((a, b) => (a[sortTerm] < b[sortTerm]) ? -1 : 1);
      this.currentSort.field = sortTerm;
      this.currentSort.order = "asc"
    }

    this.tripsRecords = this.applyPaging(this.page.start, this.page.end);

  }
  loadData() {
    this.trips.getAllTrips().subscribe(data => {
      this.data = data;
      this.tripsRecords = data.slice(0, this.recordsPerPage);
      this.recordsPages = [];
      this.populatePages();
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/']);
        localStorage.clear();
      }
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
    let pagesCount = Math.ceil(this.data.length / this.recordsPerPage);
    for (let i = 1; i <= pagesCount; i++) {
      this.recordsPages.push(i);
    }
  }

}
