import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from '../interfaces/Sesion';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'st_1892@121';
  private jwtHelper = new JwtHelperService();

  API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  //API_URL= 'http://localhost:3000/api/futbol'

  constructor(private http: HttpClient) { }

  /************************************TOKEN**********************************/ 
  setToken(token : string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
  getUserRole() : { rol: string }| null{
    const token = this.getToken();
    console.log(token)
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken
    }
    return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**********************************SERVICES**********************************/ 

  register(form : any){
    return this.http.post(`${this.API_URL}/register`, form)
  }

  login(form : Sesion) : Observable<any[]>{
    return this.http.post<any[]>(`${this.API_URL}/login`, form)
  }

  verifyAccountCode(id: string | null, code: number): Observable<any[]> {
    return this.http.post<any[]>(this.API_URL + '/verify-account-code/' + id , { code });
  }

}
