import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  gotoAlumnos() {
    console.log('Botón pulsado'); 
    this.router.navigate(['/alumnos']); 
  }

  gotoNiveles() {
    this.router.navigate(['/niveles']);
  }

}
