import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { Format } from '../interfaces/Format';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  //API_URL= 'http://localhost:3000/api/futbol'

  constructor(private http : HttpClient) { }

  /***************************************CATEGORIAS******************************************/ 

  createCategory(form : Category){
    return this.http.post(`${this.API_URL}/agregar-categoria`, form)
  }

  getCategory(id : any) {
    return this.http.get(`${this.API_URL}/obtener-categoria/${id}`)
  }

  private categorySubject = new BehaviorSubject<Category[] | null>(null);
  public categories$ = this.categorySubject.asObservable();

  getCategoriesFromBackend() {
    return this.http.get<{ categories: Category[] }>(`${this.API_URL}/obtener-categorias`);
  }

  // 🟢 Actualiza el BehaviorSubject con las categorías
  getCategories() {
    this.getCategoriesFromBackend().subscribe({
      next: (res) => {
        const sorted = res.categories.sort((a:any, b:any) => a.order - b.order);
        this.categorySubject.next(sorted);
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }

  // ✏️ Edita una categoría y actualiza la lista automáticamente
  editCategory(id: any, form: Category) {
    return this.http.put(`${this.API_URL}/editar-categoria/${id}`, form).pipe(
      tap(() => this.getCategories())
    );
  }


  deleteCategory(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-categoria/${id}`)
    
  }

  updateCategoryOrder(categories: string[]): Observable<any> {
    return this.http.put(`${this.API_URL}/categories/order`, { categories });
  }


  /*************************************FORMATOS***********************************************/

  createFormat(form : Format){
    return this.http.post(`${this.API_URL}/agregar-formato`, form)
  }

  getFormats(){
    return this.http.get(`${this.API_URL}/obtener-formatos`)
  }

  getFormat(id: any){
    return this.http.get(`${this.API_URL}/obtener-formato/${id}`)
  }

  editFormat(id : any, formato : any){
    return this.http.put(`${this.API_URL}/editar-formato/${id}`, formato)
  }

  deleteFormat(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-formato/${id}`)
  }

  updateFormatsOrder(formats: string[]): Observable<any> {
    return this.http.put(`${this.API_URL}/formats/order`, { formats });
  }

/*********************************************CAMPEONATOS***********************************************/ 

  createCampeonato(form : any){
    return this.http.post(`${this.API_URL}/agregar-campeonato`, form)
  }

  getCampeonatos(){
    return this.http.get(`${this.API_URL}/obtener-campeonatos`)
  }

  getCampeonato(id:any){
    return this.http.get(`${this.API_URL}/obtener-campeonato/${id}`)
  }

  editCampeonato(id:any, form : any){
    return this.http.put(`${this.API_URL}/editar-campeonato/${id}`, form)
  }

  deleteCampeonato(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-campeonato/${id}`)
  }

  updateCampeonatoOrder(campeonatos: any[]): Observable<any> {
    return this.http.put(`${this.API_URL}/campeonatos/order`, { campeonatos });
  }

/*********************************************EDADES****************************************************/ 

createEdad(form : any){
  return this.http.post(`${this.API_URL}/agregar-edad`, form)
}

getEdades(){
  return this.http.get(`${this.API_URL}/obtener-edades`)
}

getEdad(id:any){
  return this.http.get(`${this.API_URL}/obtener-edad/${id}`)
}

editEdad(id:any, form : any){
  return this.http.put(`${this.API_URL}/editar-edad/${id}`, form)
}

deleteEdad(id:any){
  return this.http.delete(`${this.API_URL}/eliminar-edad/${id}`)
}

updateAgeOrder(ages: any[]): Observable<any> {
  return this.http.put(`${this.API_URL}/ages/order`, { ages });
}

/*******************************************EMPRESAS****************************************************/

createEmpresa(form : any){
  return this.http.post(`${this.API_URL}/crear-empresa`, form)
}

getEmpresa(id:any){
  return this.http.get(`${this.API_URL}/obtener-empresa/${id}`)
}

getEmpresas(){
  return this.http.get(`${this.API_URL}/obtener-empresas`)
}

editEmpresa(id:any, form:any){
  return this.http.put(`${this.API_URL}/editar-empresa/${id}`, form)
}

deleteEmpresa(id:any){
  return this.http.delete(`${this.API_URL}/eliminar-empresa/${id}`)
}

/***********************************************SEDES*******************************************************/ 

createSede(id : any,form : any){
  return this.http.post(`${this.API_URL}/crear-sede/${id}`, form)
}

getSede(id : any){
  return this.http.get(`${this.API_URL}/obtener-sede/${id}`)
}

getSedes(id : any){
  return this.http.get(`${this.API_URL}/obtener-sedes/${id}`)
}

getMySedes(){
  return this.http.get(`${this.API_URL}/obtener-mis-sedes`)
}

editSede(id : any, form : any){
  return this.http.put(`${this.API_URL}/editar-sede/${id}`, form)
}

editPhotoSede(id: any, form:any){
  return this.http.put(`${this.API_URL}/editar-foto-sede/${id}`, form)
}

deletePhotoSede(sedeId: string, index: number): Observable<any> {
  const url = `${this.API_URL}/eliminar-foto-sede/${sedeId}`;
  return this.http.delete(url, { body: { index } }); // Enviamos el índice de la imagen que se desea eliminar
}

deleteSede(id : any){
  return this.http.delete(`${this.API_URL}/eliminar-sede/${id}`)
}

actualizarHorario(id: any, datosHorario: any): Observable<any> {
  return this.http.put(`${this.API_URL}/actualizar-horario/${id}`, datosHorario);
}

/***********************************************STADIUMS****************************************************/ 
createStadium(id : any, form : any){
  return this.http.post(`${this.API_URL}/crear-estadio/${id}`, form)
}

getStadium(id : any){
  return this.http.get(`${this.API_URL}/obtener-estadio/${id}`)
}

getStadiums(id : any){
  return this.http.get(`${this.API_URL}/obtener-estadios/${id}`)
}

getEstadios(){
  return this.http.get(`${this.API_URL}/obtener-estadios`);
}

editStadium(id : any, form : any){
  return this.http.put(`${this.API_URL}/editar-estadio/${id}`, form)
}

deleteStadium(id : any){
  return this.http.delete(`${this.API_URL}/eliminar-estadio/${id}`)
}

/*******************************************TOURNAMENTS***************************************************/ 

  createTournament(form:any){
    return this.http.post(`${this.API_URL}/crear-torneo`, form)
  }

  getTournament(id:any){
    return this.http.get(`${this.API_URL}/obtener-torneo/${id}`)
  }

  getTournaments(
    skip: number = 0,
    limit: number = 10,
    year?: number[],
    torneo?: string,
    dia?: string,
    formato?: string,
    edad?: string
  ): Observable<any> {
    const params: any = {
      skip: skip.toString(),
      limit: limit.toString(),
    };

    if (year && year.length > 0) {
      params.year = year.join(',');
    }
    if (torneo) params.torneo = torneo;
    if (dia) params.dia = dia;
    if (formato) params.formato = formato;
    if (edad) params.edad = edad;

    return this.http.get(`${this.API_URL}/obtener-torneos`, { params });
  }

  private tournametUpdated = new Subject<void>()

  editTournament(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-torneo/${id}`, form).pipe(
      tap(() => this.tournametUpdated.next())
    )
  }

  getTournamentUpdate() {
    return this.tournametUpdated.asObservable()
  }

  editCupos(id : any, cupos : any) {
    return this.http.patch(`${this.API_URL}/editar-cupos/${id}`, { cupos })
  }

  restarCupos(id : any, cupos : any) {
    return this.http.patch(`${this.API_URL}/restar-cupos/${id}`, { cupos })
  }

  deleteTournament(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-torneo/${id}`)
  }

  getListSubscribed(id : any){
    return this.http.get(`${this.API_URL}/obtener-equipos-suscritos/${id}`)
  }

  getDayTournament(id:any, dayId:any){
    return this.http.get(`${this.API_URL}/obtener-dia-torneo/${id}/${dayId}/`)
  }

  editDayTournament(id : any, dayId: any, form : any){
    return this.http.put(`${this.API_URL}/editar-dia-torneo/${id}/${dayId}`, form)
  }

  deleteDayTournament(id: any, dayId: any){
    return this.http.delete(`${this.API_URL}/eliminar-dia-torneo/${id}/${dayId}`)
  }

  createDayTournament(id :any, form :any){
    return this.http.put(`${this.API_URL}/crear-dia-torneo/${id}`, form)
  }

  getTotals(){
    return this.http.get(`${this.API_URL}/get-totals`)
  }

  updateTournamentOrder(torneo: string[]): Observable<any> {
    return this.http.put(`${this.API_URL}/torneos/order`, { torneo });
  }

  getMyTournaments(){
    return this.http.get(`${this.API_URL}/obtener-mis-torneos/`)
  }

  editFormatImage(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-formatImage/${id}`, form)
  }

  editTorneoImage(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-torneoImage/${id}`, form)
  }

  editAwardsImage(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-awardsImage/${id}`, form)
  }

  updateTeamsPreferences(tournamentId: any, updatedTeams: any) {
    return this.http.put(`${this.API_URL}/editar-preferencias/${tournamentId}`, { teams: updatedTeams });
  }
  
  descargarPdf(id: string) {
    return this.http.get(`${this.API_URL}/pdf/${id}`, {
      responseType: 'blob' // ✅ Indicar que la respuesta es un archivo binario (PDF)
    });
  }

  crearSancion(id: any, sancionData: any) {
  return this.http.post(`${this.API_URL}/crear-sancion/${id}`, sancionData).pipe(
    tap((res: any) => {
      // 🚀 agrego la sanción recién creada a la lista
      const actuales = this.sancionesSubject.value;
      this.sancionesSubject.next([...actuales, res.sancion]);
    })
  );
}
/***************************************************FIXTURE*****************************************************/ 

  generateFixture(id:any, form : any){
    return this.http.post(`${this.API_URL}/generar-fixture/${id}`, form)
  }

  actualizarResultado(idTorneo: any, jornada: any, partidoId: any, form: any): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizar-resultado/${idTorneo}/${jornada}/${partidoId}`, form);
  }

  actualizarResultadosJornada(idTorneo: string, formActualizacion: any) {
    // Asegúrate de que la URL apunte a la nueva ruta que creaste:
    // PUT /api/torneos/actualizar-jornada/:idTorneo
    return this.http.put(`${this.API_URL}/actualizar-jornada/${idTorneo}`, formActualizacion);
  }

  actualizarResultadoEliminatoria(idTorneo: any, round: any, matchId: any, form: any): Observable<any> {
  return this.http.put(`${this.API_URL}/actualizar-resultado/${idTorneo}/eliminatoria/${round}/partido/${matchId}`, form);
}

  /*generarEliminatoria(torneoId: string) {
    return this.http.post(`${this.API_URL}/generar-eliminatoria/${torneoId}`, {});
  }*/

  generarEliminatoria(torneoId: string, faseInicial: string) {
  return this.http.post(`${this.API_URL}/generar-eliminatoria/${torneoId}`, { faseInicial });
}

  getPartidoEliminatoria(torneoId: string, roundIndex: number, matchIndex: number): Observable<any> {
    return this.http.get(`${this.API_URL}/eliminatoria/${torneoId}/ronda/${roundIndex}/partido/${matchIndex}`);
  }

avanzarEliminatoria(torneoId: string) {
  return this.http.post(`${this.API_URL}/avanzar-eliminatoria/${torneoId}`, {});
}

actualizarGanador(torneoId: string, roundIndex: number, matchIndex: number, winnerTeamId: string) {
  return this.http.put(
    `${this.API_URL}/actualizar-ganador/${torneoId}/eliminatoria/${roundIndex}/partido/${matchIndex}`,
    { winnerTeamId }
  );
}

asignarEquipos(torneoId: string, roundIndex: number, matchIndex: number, team1Id: string, team2Id: string) {
  return this.http.put(`${this.API_URL}/asignar-equipo/${torneoId}/eliminatoria/${roundIndex}/partido/${matchIndex}`, {
    team1Id,
    team2Id
  });
}


  /*actualizarGanador(torneoId: string, roundIndex: number, matchIndex: number, winnerTeamId: string) {
    return this.http.put(`${this.API_URL}/actualizar-ganador/${torneoId}/eliminatoria/${roundIndex}/partido/${matchIndex}`, {
      winnerTeamId
    });
  }*/

  verEliminatoria(torneoId: string) {
    return this.http.get(`${this.API_URL}/ver-eliminatoria/${torneoId}`);
  }

  restaurarEliminatoria(torneoId: string) {
    return this.http.delete(`${this.API_URL}/restaurar-eliminatoria/${torneoId}`, {});
  }

  updateTarjetas(id:any, form:any){
    return this.http.put(`${this.API_URL}/change-tarjetas/${id}`, form)
  }

 updateJugadores(id:any,jugadorId:any,jornadaNumber:any,jugadores: any) {
  return this.http.put(`${this.API_URL}/change-multiple-tarjetas/${jugadorId}/${jornadaNumber}/${id}`, jugadores);
}

updateJugadoresEliminatorias(id:any,jugadorId:any,ronda:any,jugadores: any) {
  return this.http.put(`${this.API_URL}/change-multiple-tarjetas-eliminatoria/${jugadorId}/${ronda}/${id}`, jugadores);
}

private refresh$ = new BehaviorSubject<void>(undefined);

getRefreshObservable() {
  return this.refresh$.asObservable();
}

emitRefresh() {
  this.refresh$.next();
}

  getGoleador(id:any){
    return this.http.get(`${this.API_URL}/goleadores/${id}`)
  }

  getVallaMenosVencida(id:any){
    return this.http.get(`${this.API_URL}/valla-menos-vencida/${id}`)
  }

  getFairPLay(id:any){
    return this.http.get(`${this.API_URL}/fair-play/${id}`)
  }

  private sancionesSubject = new BehaviorSubject<any[]>([]);
  sanciones$ = this.sancionesSubject.asObservable();

 getTribunales(id: any) {
  return this.http.get(`${this.API_URL}/obtener-sanciones/${id}`).pipe(
    tap((res: any) => {
      this.sancionesSubject.next(res.sanciones); // 🔔 guardo sanciones globalmente
    })
  );
}

  editFechas(payload: { sanciones: Array<{ _id: string; fechas_de_expulsion: number }> }){
    return this.http.put(`${this.API_URL}/editar-sanciones`, payload)
  }

/****************************************************DAYS*****************************************************/ 

  createDay(id:any, form:any){
    return this.http.post(`${this.API_URL}/crear-dia/${id}`, form)
  }

  getDay(id:any){ 
    return this.http.get(`${this.API_URL}/obtener-dia/${id}`)
  }

  getDays(id:any){
    return this.http.get(`${this.API_URL}/obtener-dias/${id}`)
  }

  editDays(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-dia/${id}`, form)
  }

  deleteDay(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-dia/${id}`)
  }

  /*******************************************************HORARIOS*************************************************/

  createSchedule(id:any, form:any){
    return this.http.post(`${this.API_URL}/crear-horario/${id}`, form)
  }

  getSchedule(id:any){
    return this.http.get(`${this.API_URL}/obtener-horario/${id}`)
  }

  getSchedules(id:any){
    return this.http.get(`${this.API_URL}/obtener-horarios/${id}`)
  }

  editSchedules(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-horario/${id}`, form)
  }

  deleteSchedule(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-horario/${id}`)
  }

  deleteHour(id : any, form : any){
    return this.http.put(`${this.API_URL}/eliminar-hora/${id}`, form)
  }
}
