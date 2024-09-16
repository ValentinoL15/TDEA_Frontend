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

  editPhoto(id : any, image : any){
    return this.http.patch(`${this.API_URL}/editar-imagen-equipo/${id}`, image)
  }

  eliminarTeam(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-equipo/${id}`)
  }

  actualizarEquipo(equipoId : any){
    return this.http.put(`${this.API_URL}/mostrar-equipo`, {active: equipoId})
  }

  getPlayersTeam(){
    return this.http.get(`${this.API_URL}/obtener-jugadores-equipo`)
  }

  getTeamActive(){
    return this.http.get(`${this.API_URL}/equipo-seleccionado`)
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

  editPhotoList(id: any, image : any){
    return this.http.patch(`${this.API_URL}/editar-imagen-lista/${id}`, image)
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

  editPhotoPlayer(id : any, image : any){
    return this.http.patch(`${this.API_URL}/editar-imagen-jugador/${id}`, image)
  }

  deletPlayer(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-jugador/${id}`)
  }

  getPlayerLista(tournamentSubscribed: any, id: any){
    return this.http.get(`${this.API_URL}/obtener-jugador-lista/${tournamentSubscribed}/${id}`)
  }

  getTitulares(id : any){
    return this.http.get(`${this.API_URL}/obtener-titulares/${id}`)
  }

  getSuplentes(id : any, alineacion: any){
    return this.http.get(`${this.API_URL}/obtener-suplentes/${id}/${alineacion}`)
  }

  agregarTitulares(id : any, jugador: any){
    return this.http.put(`${this.API_URL}/agregar-titular/${id}`, jugador)
  }

  agregarSuplentes(id : any, jugador : any){
    return this.http.put(`${this.API_URL}/agregar-suplente/${id}`, jugador)
  }
  

  /*********************************************INGRESAR-TORNEO***********************************************/ 
  ingresarTorneo(id : any, form : any){
    return this.http.put(`${this.API_URL}/registrarse-torneo/${id}`, form)
  }

  /*****************************************ALINEACIONES*******************************************************/

  getAlineacion(id : any){
    return this.http.get(`${this.API_URL}/obtener-alineacion/${id}`)
  }

  updatePosition(id: any, posicion: string, jugadorId: any) {
    return this.http.put(`${this.API_URL}/actualizar-posicion/${id}`, { posicion, jugadorId });
  }

  resetearPosiciones(id:any){
    return this.http.put(`${this.API_URL}/reset-alineacion/${id}`, {})
  }
}
