import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'token';

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  // REGISTRO
  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  // LOGIN BÁSICO (Autenticación básica real)
  loginBasic(email: string, password: string) {
    const basic = btoa(`${email}:${password}`);

    return this.http.post(
      `${this.baseUrl}/login-basic`,
      {},
      { headers: { Authorization: `Basic ${basic}` } }
    );
  }

  // LOGIN CON TOKEN
  loginToken(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login-token`, { email, password });
  }

  // GUARDAR TOKEN
  async guardarToken(token: string) {
    await this.storage.set(this.tokenKey, token);
  }

  // OBTENER TOKEN
  async obtenerToken() {
    return this.storage.get(this.tokenKey);
  }

  // LOGOUT
  async logout() {
    await this.storage.remove(this.tokenKey);
  }
}
