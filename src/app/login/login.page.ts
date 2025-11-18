import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        console.log('Login exitoso', res);
        //  redirigir a otra página si
      },
      error: err => {
        console.error('Login fallido', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
