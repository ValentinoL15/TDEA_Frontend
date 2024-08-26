import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { Format } from '../interfaces/Format';
import { Division } from '../interfaces/Division';
import { Season } from '../interfaces/Season';

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

/*********************************************DIVISIONES***********************************************/ 

  createDivision(form : any){
    return this.http.post(`${this.API_URL}/agregar-division`, form)
  }

  getDivisions(){
    return this.http.get(`${this.API_URL}/obtener-divisiones`)
  }

  getDivision(id:any){
    return this.http.get(`${this.API_URL}/obtener-division/${id}`)
  }

  editDivision(id:any, form : any){
    return this.http.put(`${this.API_URL}/editar-division/${id}`, form)
  }

  deleteDivision(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-division/${id}`)
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

editSede(id : any, form : any){
  return this.http.put(`${this.API_URL}/editar-sede/${id}`, form)
}

deleteSede(id : any){
  return this.http.delete(`${this.API_URL}/eliminar-sede/${id}`)
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

  getTournaments(){
    return this.http.get(`${this.API_URL}/obtener-torneos`)
  }

  editTournaments(id:any, form:any){
    return this.http.put(`${this.API_URL}/editar-torneo/${id}`, form)
  }

  deleteTournament(id:any){
    return this.http.delete(`${this.API_URL}/eliminar-torneo/${id}`)
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
}
