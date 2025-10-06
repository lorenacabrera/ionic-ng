import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  endpoint: string = "http://localhost:8081/api/alumnos";

  constructor(private httpClient: HttpClient){}


  getAlumnos(){
    return this.httpClient.get(this.endpoint);
  }
}
