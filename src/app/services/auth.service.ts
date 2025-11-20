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

  // registro
  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  // login basico (Autenticación básica real)
  loginBasic(email: string, password: string) {
    const basic = btoa(`${email}:${password}`);

    return this.http.post(
      `${this.baseUrl}/login-basic`,
      {},
      { headers: { Authorization: `Basic ${basic}` } }
    );
  }

  // login token
  loginToken(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login-token`, { email, password });
  }

  // guardar token
  async guardarToken(token: string) {
    await this.storage.set(this.tokenKey, token);
  }

  // obtener token
  async obtenerToken() {
    return this.storage.get(this.tokenKey);
  }

  // salir/eliminar token
  async logout() {
    await this.storage.remove(this.tokenKey);
  }
}
