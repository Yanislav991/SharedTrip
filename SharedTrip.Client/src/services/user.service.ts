import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = this.auth.getToken();
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
  editUserPath = environment.apiUrl + 'api/user/edit';
  constructor(private http:HttpClient, private auth:AuthService) { }

  updateUser(data: any): Observable<any> {
    return this.http.post(this.editUserPath, data, { headers: this.headers })
  }
}
