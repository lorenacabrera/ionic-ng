import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  Alumno: string = "alumno";
  Profesor: string = "profesor";

  constructor(private router: Router) {}

  gotoalumnos(){
    this.router.navigateByUrl("/alumnos");
  }

}
