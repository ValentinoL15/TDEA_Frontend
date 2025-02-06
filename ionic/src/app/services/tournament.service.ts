import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { Format } from '../interfaces/Format';
import { Observable, Subject, tap } from 'rxjs';

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

  getCategories(){
    return this.http.get(`${this.API_URL}/obtener-categorias`)
  }

  editCateogry(id:any, form : Category){
    return this.http.put(`${this.API_URL}/editar-categoria/${id}`, form)
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
    return this.http.get(`${this.API_URL}/obtener-dia-torneo/${id}/${dayId}`)
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
