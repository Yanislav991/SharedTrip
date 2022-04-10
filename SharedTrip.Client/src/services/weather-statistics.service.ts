import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherStatisticsService {
  constructor(private http: HttpClient) {}
  getWeatherData(path:string): Observable<any> {
    return this.http.get(path)
  }
}

