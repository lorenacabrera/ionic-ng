import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private apiUrl = "http://localhost:3000/api/fotos";

  constructor(private http: HttpClient) { }

  // Obtener todas las fotos
  getFotos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Subir foto
  subirFoto(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // Actualizar foto
  actualizarFoto(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // Eliminar foto
  eliminarFoto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
