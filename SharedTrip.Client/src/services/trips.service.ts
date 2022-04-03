import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITrip } from 'src/interfaces/ITrip';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  allTripsPath = environment.apiUrl + 'api/trip/all';
  createTripsPath = environment.apiUrl + 'api/trip/create';
  editTripsPath = environment.apiUrl + 'api/trip/edit';
  getDetailsTripPath = environment.apiUrl + 'api/trip/details/';
  token: string = this.auth.getToken();
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

  constructor(private http: HttpClient, private auth: AuthService) { }
  getAllTrips(): Observable<any> {
    return this.http.get(this.allTripsPath, { headers: this.headers })
  }
  getTripById(id: number): Observable<any> {
    return this.http.get(this.getDetailsTripPath + id, { headers: this.headers })
  }
  create(data: any): Observable<any> {
    return this.http.post(this.createTripsPath, data, { headers: this.headers })
  }
  edit(data: any): Observable<any> {
    return this.http.put(this.editTripsPath, data, { headers: this.headers })
  }
}
