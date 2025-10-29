import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos-service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  //standalone: false
})
export class AlumnosPage implements OnInit {

  alumnos: any = [];
  alumnoForm!: FormGroup;
  
  constructor(
    private alumnosService: AlumnosService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllAlumnos();

    //configuramos formulario con validaciones
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido1: ['', Validators.required],
    });
  }

  getAllAlumnos(){
    this.alumnosService.getAlumnos().subscribe({
      next: (response) => this.alumnos = response,
      error: (err) => console.error('error al obtener alumnos', err)
    });
  }
}
