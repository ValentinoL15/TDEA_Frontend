import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../interfaces/Team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  //API_URL= 'http://localhost:3000/api/futbol'
  constructor(private http: HttpClient) { }

/*************************************************ADMIN**********************************************/ 

createAdmin(form: any){
  return this.http.post(`${this.API_URL}/crear-admin`, form)
}

getUsers(){
  return this.http.get(`${this.API_URL}/obtener-my-users`)
}

getUser(id : any){
  return this.http.get(`${this.API_URL}/obtener-user/${id}`)
}

deleteUser(id : any){
  return this.http.delete(`${this.API_URL}/eliminar-user/${id}`)
}

editUser(id:any, form : any){
  return this.http.put(`${this.API_URL}/editar-user/${id}`, form)
}


/*************************************************TEAM*****************************************************/
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

  getEmpty(){
    return this.http.get(`${this.API_URL}/obtener-empty`)
  }

  deletePhotoTeam(id : any){
    return this.http.put(`${this.API_URL}/eliminar-foto-equipo/${id}`, {})
  }

  /*************************************************LISTA***************************************************/ 

  createList(form: any){
    return this.http.post(`${this.API_URL}/crear-lista`, form)
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

  addPlayerList(id : any, jugadorId: any){
    return this.http.put(`${this.API_URL}/agregar-jugador-lista/${id}`, {jugadorId})
  }

  deletePhotoLista(id : any){
    return this.http.put(`${this.API_URL}/eliminar-foto-lista/${id}`, {})
  }

  /************************************************PLAYERS**************************************************/ 

  crearJugador( form:any){
    return this.http.post(`${this.API_URL}/crear-jugador`, form)
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

  getSuplentes(id : any){
    return this.http.get(`${this.API_URL}/obtener-suplentes/${id}`)
  }

  agregarTitulares(id : any, jugador: any){
    return this.http.put(`${this.API_URL}/agregar-titular/${id}`, jugador)
  }

  agregarSuplentes(id : any, jugador : any){
    return this.http.put(`${this.API_URL}/agregar-suplente/${id}`, { titularId: jugador })
  }

  eliminarSuplente(id : any, jugador: any, position: any = null){
    return this.http.put(`${this.API_URL}/eliminar-suplente/${id}`, { jugadorId: jugador, position })
  }

  agregarJugadorLista(id : any, form : any){
    return this.http.post(`${this.API_URL}/agregar-jugador-team-lista/${id}`, form)
  }

  enviarSuplente(id: string, position: any): Observable<any> {
    const body = { position }; // Solo necesitas enviar la posición
    return this.http.put(`${this.API_URL}/enviar-suplente/${id}`, body);
}
  
  

  /*********************************************INGRESAR-TORNEO***********************************************/ 
  ingresarTorneo(id: any, teamListId: any): Observable<any> {
    return this.http.post(`${this.API_URL}/registrarse-torneo/${id}`, teamListId);
  }

  procesarInscripcion(tournamentId: any, teamListId: any): Observable<any> {
    return this.http.get(`${this.API_URL}/success?tournamentId=${tournamentId}&teamListId=${teamListId}`);
  }

  getPending(){
    return this.http.get(`${this.API_URL}/pending`)
  }

  checkPaymentStatus(paymentId: string) {
    return this.http.get(`${this.API_URL}/payment-status/${paymentId}`);
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
