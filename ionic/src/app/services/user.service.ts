import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../interfaces/Team';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  API_URL= 'http://localhost:3000/api/futbol'
  constructor(private http: HttpClient) { }

  createTeam(form : Team){
    return this.http.post(`${this.API_URL}/crear-equipo`, form)
  }

  getTeams(){
    return this.http.get(`${this.API_URL}/obtener-equipos`)
  }

  getTeam(id:any){
    return this.http.get(`${this.API_URL}/obtener-equipo/${id}`)
  }


  createList(id:any, form: any){
    return this.http.post(`${this.API_URL}/crear-lista/${id}`, form)
  }

  getLists(id:any){
    return this.http.get(`${this.API_URL}/obtener-listas/${id}`)
  }

  getList(){
    return this.http.get(`${this.API_URL}/obtener-lista`)
  }



}
