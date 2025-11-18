import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  gotoAlumnos() {
    this.router.navigate(['/alumnos']);
  }

  gotoNiveles() {
    this.router.navigate(['/niveles']);
  }

  gotoCalendario() {
    this.router.navigate(['/calendario']);
  }

  gotoFotos() {
    this.router.navigate(['/fotos']);
  }

}

  
