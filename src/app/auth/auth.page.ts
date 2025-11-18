import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone:false,
})
export class AuthPage {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        alert('Login exitoso!');
      },
      error: (err) => {
        console.error('Error login:', err);
        alert('Login fallido');
      }
    });
  }

  onRegister() {
    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Registro exitoso!');
      },
      error: (err) => {
        console.error('Error registro:', err);
        alert('Registro fallido');
      }
    });
  }
}
