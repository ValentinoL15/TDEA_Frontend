import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../interfaces/Team';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  //API_URL= 'http://localhost:3000/api/futbol'
  constructor(private http: HttpClient) { }

  createTeam(form : any){
    return this.http.post(`${this.API_URL}/crear-equipo`, form)
  }

  getTeams(){
    return this.http.get(`${this.API_URL}/obtener-equipos`)
  }

  getTeam(id:any){
    return this.http.get(`${this.API_URL}/obtener-equipo/${id}`)
  }

  editTeam(id:any , form:any){
    return this.http.put(`${this.API_URL}/editar-equipo/${id}`, form)
  }

  eliminarTeam(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-equipo/${id}`)
  }

  /*************************************************LISTA***************************************************/ 

  createList(id:any, form: any){
    return this.http.post(`${this.API_URL}/crear-lista/${id}`, form)
  }

  getLists(id:any){
    return this.http.get(`${this.API_URL}/obtener-listas/${id}`)
  }

  getList(id:any){
    return this.http.get(`${this.API_URL}/obtener-lista/${id}`)
  }

  editList(id: any, form : any){
    return this.http.put(`${this.API_URL}/editar-lista/${id}`, form)
  }

  eliminarLista(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-lista/${id}`)
  }

  getAllLists(){
    return this.http.get(`${this.API_URL}/obtener-mis-listas`)
  }

  /************************************************PLAYERS**************************************************/ 

  crearJugador(id:any, form:any){
    return this.http.post(`${this.API_URL}/crear-jugador/${id}`, form)
  }

  getPlayers(id:any){
    return this.http.get(`${this.API_URL}/obtener-jugadores/${id}`)
  }

  getPlayer(id:any){
    return this.http.get(`${this.API_URL}/obtener-jugador/${id}`)
  }

  editPlayer(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-jugador/${id}`, form)
  }

  deletPlayer(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-jugador/${id}`)
  }



}
