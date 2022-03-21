import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  allTripsPath = environment.apiUrl + 'api/trip/all';
  constructor(private http: HttpClient, private auth:AuthService) { }
  getAllTrips() : Observable<any>{
    var token:string = this.auth.getToken();
    const headers = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return this.http.get(this.allTripsPath,{headers:headers})
  }
}
