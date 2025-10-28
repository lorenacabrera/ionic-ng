import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService{

  endpoint: string = "http://localhost:3000/api/alumnos";

  constructor(private httpClient: HttpClient){}


  getAlumnos(){
    return this.httpClient.get(this.endpoint);
  }
}
