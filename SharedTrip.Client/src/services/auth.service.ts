import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from 'src/interfaces/IProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'api/authenticate/login'
  private registerPath = environment.apiUrl + 'api/authenticate/register'
  private getUserTripId = environment.apiUrl + 'api/trip/userId/'
  private editUserPath = environment.apiUrl + 'api/user/edit';
  private getUserProfile = environment.apiUrl + 'api/user/get/'

  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    return this.http.post(this.loginPath, data)
  }
  register(data: any): Observable<any> {
    return this.http.post(this.registerPath, data)
  }
  logout(){
    localStorage.clear();
  }
  saveToken(token:string){
    localStorage.setItem('token', token);
  }
  getToken():string{
    return localStorage.getItem('token')?? '';
  }
  isOwner(id: string | null): Promise<any> {
   return firstValueFrom(this.http.get(this.getUserTripId + id))
  }
  getUser():Observable<IProfile>{
    return this.http.get<IProfile>(this.getUserProfile)
  }
  updateUser(data: any): Observable<any> {
    return this.http.post(this.editUserPath, data)
  }
}
