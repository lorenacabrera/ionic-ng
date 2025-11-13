import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {
  endpoint = 'http://localhost:3000/api/nivel';

  constructor(private http: HttpClient) {}

  getNiveles(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  crearNivel(data: any): Observable<any> {
    return this.http.post(this.endpoint, data);
  }

  actualizarNivel(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  eliminarNivel(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
