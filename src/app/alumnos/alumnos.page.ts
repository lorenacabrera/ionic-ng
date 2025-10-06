import { Component, OnInit } from '@angular/core';
import { alumnosService } from '../services/alumnos-service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone: false
})
export class AlumnosPage implements OnInit {

  alumnos: any = [
    {
      id: 1,
      nombre: "Juan",
      apellidos: "Bar"
    }, {
      id: 2,
      nombre: "Pedro",
      apellidos: "Foo"

    }
  ]

  constructor(private alumnosService: alumnosService) { }

  ngOnInit() {
    this.getAllAlumnos();
  }

  getAllAlumnos(){
    this.alumnosService.getAllAlumnos().subscribe((response) => {
      this.alumnos = response
    });
  }

}
