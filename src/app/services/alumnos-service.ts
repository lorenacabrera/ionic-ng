import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  endpoint: string = "http://localhost:3000/api/alumnos";

  constructor(private httpClient: HttpClient) {}

  //Obtener todos los alumnos
  getAlumnos(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  }

  //Crear un nuevo alumno
  crearAlumno(data: any): Observable<any> {
    return this.httpClient.post(this.endpoint, data);
  }

  // Actualizar un alumno existente
  actualizarAlumno(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${id}`, data);
  }

  // Eliminar un alumno
  eliminarAlumno(id: number): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
