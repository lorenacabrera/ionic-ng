import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  // Login básico
  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login-basic`, { email, password });
  }

  // Registro de usuario
  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }
}
