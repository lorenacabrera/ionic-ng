import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos-service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone:false,

})
export class AlumnosPage implements OnInit {

  alumnos: any = [];
  alumnoForm!: FormGroup;
  editandoId: number | null = null;
  
  constructor(
    private alumnosService: AlumnosService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.getAllAlumnos();
  }
    inicializarFormulario(){
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

  guardarAlumno() {
    if (this.alumnoForm.invalid) return;

    if (this.editandoId) {
      // Actualizamos
      this.alumnosService.actualizarAlumno(this.editandoId, this.alumnoForm.value).subscribe({
        next: res => {
          console.log('Alumno actualizado', res);
          this.alumnoForm.reset();
          this.editandoId = null;
          this.getAllAlumnos();
        },
        error: err => console.error('Error al actualizar alumno', err)
      });
    } else {
      // Creamos
      this.alumnosService.crearAlumno(this.alumnoForm.value).subscribe({
        next: res => {
          console.log('Alumno creado', res);
          this.alumnoForm.reset();
          this.getAllAlumnos();
        },
        error: err => console.error('Error al crear alumno', err)
      });
    }
  }
  //editamos
  editarAlumno(alumno: any) {
    this.editandoId = alumno.id;
    this.alumnoForm.patchValue({
      nombre: alumno.nombre,
      apellido1: alumno.apellido1
    });
  }
  //eliminamos
  eliminarAlumno(id: number) {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnosService.eliminarAlumno(id).subscribe({
        next: res => {
          console.log('Alumno eliminado', res);
          this.getAllAlumnos();
        },
        error: err => console.error('Error al eliminar alumno', err)
      });
    }
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.alumnoForm.reset();
  }
}