import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {

  email = "";
  password = "";

  constructor(
    private auth: AuthService,
    private nav: NavController
  ) {}

  // LOGIN BÁSICO
  loginBasic() {
    this.auth.loginBasic(this.email, this.password).subscribe({
      next: res => {
        console.log("Login Básico correcto:", res);
        this.nav.navigateRoot('/home');
      },
      error: err => {
        console.error(err);
        alert("Error en login básico");
      }
    });
  }

  // LOGIN TOKEN
  loginToken() {
    this.auth.loginToken(this.email, this.password).subscribe({
      next: async (res: any) => {
        console.log("Login Token correcto:", res);
        await this.auth.guardarToken(res.token);
        this.nav.navigateRoot('/home');
      },
      error: err => {
        console.error(err);
        alert("Error en login con token");
      }
    });
  }
}
