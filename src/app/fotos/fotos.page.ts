import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FotosService } from '../services/fotos.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
  standalone:false,
})
export class FotosPage implements OnInit {

  fotoForm: FormGroup;
  fotos: any[] = [];

  archivoSeleccionado: File | null = null;
  editandoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fotosService: FotosService
  ) {
    // Creamos el formulario
    this.fotoForm = this.fb.group({
      titulo: ['']
    });
  }

  ngOnInit() {
    this.cargarFotos();
  }

  // Cargar lista de fotos
  cargarFotos() {
    this.fotosService.getFotos().subscribe({
      next: (data) => {
        this.fotos = data;
      },
      error: (err) => {
        console.error("Error cargando fotos", err);
      }
    });
  }

  // Guardar o actualizar foto
  guardarFoto() {
    const formData = new FormData();
    formData.append("titulo", this.fotoForm.value.titulo);

    if (this.archivoSeleccionado) {
      formData.append("foto", this.archivoSeleccionado);
    }

    if (this.editandoId) {
      // ACTUALIZAR
      this.fotosService.actualizarFoto(this.editandoId, formData).subscribe({
        next: () => {
          this.cargarFotos();
          this.cancelarEdicion();
        }
      });
    } else {
      // CREAR
      this.fotosService.subirFoto(formData).subscribe({
        next: () => {
          this.cargarFotos();
          this.fotoForm.reset();
        }
      });
    }
  }

  // Seleccionar archivo desde input file
  seleccionarArchivo(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  // Editar foto
  editarFoto(foto: any) {
    this.editandoId = foto.id;
    this.fotoForm.patchValue({
      titulo: foto.titulo
    });
    this.archivoSeleccionado = null;
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editandoId = null;
    this.archivoSeleccionado = null;
    this.fotoForm.reset();
  }

  // Eliminar foto
  eliminarFoto(id: number) {
    this.fotosService.eliminarFoto(id).subscribe({
      next: () => {
        this.cargarFotos();
      }
    });
  }
}
