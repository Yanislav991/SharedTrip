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
  constructor(private http: HttpClient, private auth:AuthService) { }
  getAllTrips() : Observable<any>{
    var token:string = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return this.http.get(this.allTripsPath,{headers:headers})
  }
  create(data:any): Observable<any>{
    var token:string = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return this.http.post(this.createTripsPath,data,{headers:headers})
  }
}
