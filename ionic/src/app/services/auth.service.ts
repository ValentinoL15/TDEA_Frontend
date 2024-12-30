import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Sesion } from '../interfaces/Sesion';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'st_1892@121';
  private jwtHelper = new JwtHelperService();

  API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  //API_URL= 'http://localhost:3000/api/futbol'

  constructor(private http: HttpClient) { }

  private userSubject = new BehaviorSubject<User | null>(null); // Acepta null
  user$ = this.userSubject.asObservable();


  /************************************TOKEN**********************************/ 
  setToken(token : string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
  getUserRole(){
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

  validateToken(token: string) {
    return this.http.post(`${this.API_URL}/validate-token`, { token });
  }

  getUser(){
    return this.http.get(`${this.API_URL}/obtener-usuario`)
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

  forgotPassword(email : any){
    return this.http.post(`${this.API_URL}/forgot-password`, {email})
  }

  resetPassword(id: any, password: any){
    return this.http.put(`${this.API_URL}/reset-password/${id}`, {password})
  }

  reenviarCode(id : any){
    return this.http.post(`${this.API_URL}/reenviar-codigo/${id}`, {})
  }

  /****************************************USER*************************************/ 

  changePhone(phone: string): Observable<any[]> {
    return this.http.patch<any[]>(this.API_URL + '/editar-telefono', { phone });
  }

  changeBirthday(birthday:Date): Observable<any[]>{
    return this.http.patch<any[]>(this.API_URL + '/editar-nacimiento', birthday)
  }

  editUser(form : any){
    return this.http.put(`${this.API_URL}/edit-user`, form)
  }
  editPhotoProfile(image: any) {
    return this.http.put<{ user: User }>(
      `${this.API_URL}/editar-imagen-profile`,
      image
    ).pipe(
      tap(response => {
        console.log('Respuesta backend:', response.user); 
        this.updateUser(response.user); // Propagar los datos siempre
      })
    );
  }

  get imageProfile(){
    return this.userSubject.asObservable()
  }

  updateUser(user: User) {
    console.log('Actualizando el BehaviorSubject con:', user);
    this.userSubject.next(user); 
  }

  set User(initialUser: User) {
    this.userSubject.next(initialUser);
  }
  
  deletePhotoProfile(image : any){
    return this.http.put(`${this.API_URL}/eliminar-foto-profile`, image)
  }

}
