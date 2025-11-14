import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NivelesService } from '../services/niveles';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.page.html',
  styleUrls: ['./niveles.page.scss'],
  standalone: false
})
export class NivelesPage implements OnInit {

  niveles: any[] = [];
  nivelForm!: FormGroup;
  editandoId: number | null = null;

  constructor(private nivelesService: NivelesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.getAllNiveles();
  }

  inicializarFormulario() {
    this.nivelForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getAllNiveles() {
    this.nivelesService.getNiveles().subscribe({
      next: res => this.niveles = res,
      error: err => console.error('Error al obtener niveles', err)
    });
  }

  guardarNivel() {
    if (this.nivelForm.invalid) return;

    if (this.editandoId) {
      // Actualizar
      this.nivelesService.actualizarNivel(this.editandoId, this.nivelForm.value).subscribe({
        next: res => {
          this.nivelForm.reset();
          this.editandoId = null;
          this.getAllNiveles();
        },
        error: err => console.error('Error al actualizar nivel', err)
      });
    } else {
      // Crear
      this.nivelesService.crearNivel(this.nivelForm.value).subscribe({
        next: res => {
          this.nivelForm.reset();
          this.getAllNiveles();
        },
        error: err => console.error('Error al crear nivel', err)
      });
    }
  }

  editarNivel(nivel: any) {
    this.editandoId = nivel.id;
    this.nivelForm.patchValue({ nombre: nivel.nombre });
  }

  eliminarNivel(id: number) {
    if (confirm('¿Estás seguro de eliminar este nivel?')) {
      this.nivelesService.eliminarNivel(id).subscribe({
        next: res => this.getAllNiveles(),
        error: err => console.error('Error al eliminar nivel', err)
      });
    }
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.nivelForm.reset();
  }
}
