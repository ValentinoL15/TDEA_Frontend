import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { Format } from '../interfaces/Format';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  //API_URL = 'https://tdeabackend-production.up.railway.app/api/futbol'
  API_URL= 'http://localhost:3000/api/futbol'

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
}
