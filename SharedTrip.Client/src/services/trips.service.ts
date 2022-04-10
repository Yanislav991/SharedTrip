import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  allTripsPath = environment.apiUrl + 'api/trip/all';
  createTripsPath = environment.apiUrl + 'api/trip/create';
  editTripsPath = environment.apiUrl + 'api/trip/edit';
  deleteTripsPath = environment.apiUrl + 'api/trip/delete';
  savePlaceTripsPath = environment.apiUrl + 'api/trip/savePlace';
  getDetailsTripPath = environment.apiUrl + 'api/trip/details/';

  constructor(private http: HttpClient) { }
  getAllTrips(): Observable<any> {
    return this.http.get(this.allTripsPath)
  }
  getTripById(id: number): Observable<any> {
    return this.http.get(this.getDetailsTripPath + id)
  }
  create(data: any): Observable<any> {
    return this.http.post(this.createTripsPath, data)
  }
  edit(data: any): Observable<any> {
    return this.http.put(this.editTripsPath, data)
  }
  delete(data: any): Observable<any> {
    return this.http.delete(this.deleteTripsPath)
  }
}
