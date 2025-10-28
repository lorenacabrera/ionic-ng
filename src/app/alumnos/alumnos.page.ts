import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos-service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone: false
})
export class AlumnosPage implements OnInit {

  alumnos: any = [];
  
  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    this.getAllAlumnos();
  }

  getAllAlumnos(){
    this.alumnosService.getAlumnos().subscribe(response => {
      this.alumnos = response;
    });
  }
}
