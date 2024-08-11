import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from '../interfaces/Sesion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000/api/futbol'

  constructor(private http: HttpClient) { }

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
