import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../interfaces/Team';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

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

updateUsersOrder(users: any[]): Observable<any> {
  return this.http.put(`${this.API_URL}/users/order`, { users });
}

getImages(){
  return this.http.get(`${this.API_URL}/obtener-imagenes`)
}

approvedPicture(id : any){
  return this.http.put(`${this.API_URL}/picture-approved/${id}`, {})
}

rejectPicture(id : any){
  return this.http.delete(`${this.API_URL}/picture-team-rejected/${id}`)
}

approvedPictureList(id : any){
  return this.http.put(`${this.API_URL}/list-approved/${id}`, {})
}

rejectPictureList(id : any){
  return this.http.delete(`${this.API_URL}/list-rejected/${id}`)
}

approvedPictureUser(id : any){
  return this.http.put(`${this.API_URL}/picture-user-approved/${id}`, {})
}

rejectedPictureUser(id : any){
  return this.http.delete(`${this.API_URL}/picture-user-rejected/${id}`)
}

playerApproved(id:any){
  return this.http.put(`${this.API_URL}/picture-players-approved/${id}`, {})
}

rejectPlayerPicture(id : any){
  return this.http.delete(`${this.API_URL}/picture-player-rejected/${id}`)
}

aprobarMultiples(ids: string[], tipo: 'team' | 'player' | 'list') {
  return this.http.post(`${this.API_URL}/aprobar-multiples`, { ids, tipo });
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

  private updateTeamUpdate = new Subject<void>()

  editTeam(form:any){
    return this.http.put(`${this.API_URL}/editar-equipo`, form).pipe(
      tap(() => this.updateTeamUpdate.next())
    )
  }

  getTeamUpdate(){
    return this.updateTeamUpdate.asObservable()
  }

  private updatePhotoList = new Subject<void>()

  editPhoto(image : any){
    return this.http.patch(`${this.API_URL}/editar-imagen-equipo`, image).pipe(
      tap(() => this.updatePhotoList.next())
    )
  }

  getPhotoTeamUpdate(){
    return this.updatePhotoList.asObservable()
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

  getDeuda(){
    return this.http.get(`${this.API_URL}/obtener-deuda-lista`)
  }

  getDeudaEquipo(){
    return this.http.get(`${this.API_URL}/obtener-deudas-equipo`)
  }

  getDeudas(deudaId: any){
    return this.http.get(`${this.API_URL}/obtener-deudas/${deudaId}`)
  }

  getTeamUsers(){
    return this.http.get(`${this.API_URL}/obtener-users`)  
  }

  transferTeam(id : any, form : any){
    return this.http.put(`${this.API_URL}/transferir-team/${id}`, form)
  }

  getTransferencias(){
    return this.http.get(`${this.API_URL}/obtener-transferencias`)
  }

  aceptarTransfer(form:any){
    return this.http.put(`${this.API_URL}/aceptar-transferencia`, form)
  }

  rechazarTransfer(form : any){
    return this.http.put(`${this.API_URL}/rechazar-transferencia`, form)
  }
  /*************************************************LISTA***************************************************/ 

  private updateList = new Subject<void>()

  createList(form: any){
    return this.http.post(`${this.API_URL}/crear-lista`, form).pipe(
      tap(() => this.updateList.next())
    )
  }

  getListUpdate(){
    return this.updateList.asObservable()
  }

  getLists(id:any){
    return this.http.get(`${this.API_URL}/obtener-listas/${id}`)
  }

  getList(id:any){
    return this.http.get(`${this.API_URL}/obtener-lista/${id}`)
  }

  private editListActualizada = new Subject<void>()

  editList( id : any , form : any){
    return this.http.put(`${this.API_URL}/editar-lista/${id}`, form ).pipe(
      tap(() => this.editListActualizada.next())
    )
  }

getListActualizada(){
  return this.editListActualizada.asObservable()
}

private editPhotoActualizada = new Subject<void>()

  editPhotoList(image : any){
    return this.http.patch(`${this.API_URL}/editar-imagen-lista`, image).pipe(
      tap(() => this.editPhotoActualizada.next())
    )
  }

getPhotoActualizada(){
  return this.editPhotoActualizada.asObservable()
}

  private myListEliminated = new Subject<void>()

  eliminarLista(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-lista/${id}`).pipe(
      tap(() => this.myListEliminated.next())
    )
  }

  getMyListEliminatedUpdate(){
    return this.myListEliminated.asObservable()
  }

  getMyList(){
    return this.http.get(`${this.API_URL}/obtener-mi-lista`)
  }

  getMyLists(){
    return this.http.get(`${this.API_URL}/obtener-mis-listas`)
  }

  getAllLists(){
    return this.http.get(`${this.API_URL}/obtener-todas-listas`)
  }

  getPlayersList(){
    return this.http.get(`${this.API_URL}/obtener-jugadores-lista`)
  }

  getMyListActive(){
    return this.http.get(`${this.API_URL}/obtener-lista-activa`)
  }

private myListUpdated = new Subject<void>();

  cambiarListActive(listId : any){
    return this.http.put(`${this.API_URL}/cambiar-lista-activa`, { listActive: listId }).pipe(
      tap(() => this.myListUpdated.next())
    )
  }

  getMyListUpdatedListener() {
    return this.myListUpdated.asObservable();
  }

  getTournamnetsList(){
    return this.http.get(`${this.API_URL}/obtener-torneos-lista`)
  }

  addPlayerList(id : any, jugadorId: any){
    return this.http.put(`${this.API_URL}/agregar-jugador-lista/${id}`, {jugadorId})
  }

  deletePhotoLista(){
    return this.http.put(`${this.API_URL}/eliminar-foto-lista`, {})
  }

  editFormacion(id : any, form : any){
    return this.http.put(`${this.API_URL}/editar-formacion/${id}`, form)
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

  eliminarPhotoPlayer(id:any){
    return this.http.put(`${this.API_URL}/eliminar-imagen-jugador/${id}`, {})
  }

  /*********************************************INGRESAR-TORNEO***********************************************/ 
  ingresarTorneo(id: any, teamListId: any): Observable<any> {
    return this.http.post(`${this.API_URL}/pagar-torneo/${id}`, teamListId);
  }

  procesarInscripcion(tournamentId: any,deudaId: any , teamListId: any, paid : any): Observable<any> {
    return this.http.get(`${this.API_URL}/success?tournamentId=${tournamentId}&deudaId=${deudaId}&teamListId=${teamListId}&paid=${paid}`);
  }

  getPending(){
    return this.http.get(`${this.API_URL}/pending`)
  }

  checkPaymentStatus(paymentId: string) {
    return this.http.get(`${this.API_URL}/payment-status/${paymentId}`);
}

  anotarseTorneo(id : any, teamListId:any){
    return this.http.post(`${this.API_URL}/anotar-torneo/${id}`, {teamListId})
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

/*************************************************PASS-MARKET****************************************************/ 

ingresarMercado(form : any){
  return this.http.post(`${this.API_URL}/ingresar-mercado`, form)
}

getMarket(){
  return this.http.get(`${this.API_URL}/obtener-mercado`)
}

getMyPlayer(){
  return this.http.get(`${this.API_URL}/obtener-myPlayer`)
}

private myPlayerUpdated = new Subject<void>();

editMyPlayer(form: any) {
  return this.http.put(`${this.API_URL}/editar-myPlayer`, form).pipe(
    // Emitir evento después de actualizar myPlayer
    tap(() => this.myPlayerUpdated.next())
  );
}

getMyPlayerUpdatedListener() {
  return this.myPlayerUpdated.asObservable();
}

editMyHorario(id : any, form : any){
  return this.http.put(`${this.API_URL}/edit-myHorarios/${id}`, form)
}

deleteHorario(id : any){
  return this.http.put(`${this.API_URL}/delete-myHorarios/${id}`, {})
}

agregarHorario(id:any,form : any){
  return this.http.post(`${this.API_URL}/agregar-horario/${id}`, form)
}

buscarJugadoresMarket(filtros: any) {
  const params: any = {};

  // Agregar filtros solo si están presentes
  if (filtros.zona) params.zona = filtros.zona;
  if (filtros.position) params.position = filtros.position;
  if (filtros.pieHabil) params.pieHabil = filtros.pieHabil;
  if (filtros.skip) params.skip = filtros.skip;
  if (filtros.limit) params.limit = filtros.limit;
  if (filtros.edadDesde) params.edadDesde = filtros.edadDesde;
  if (filtros.edadHasta) params.edadHasta = filtros.edadHasta;

  return this.http.get(`${this.API_URL}/buscar-jugadores-market`, { params });
}


}
