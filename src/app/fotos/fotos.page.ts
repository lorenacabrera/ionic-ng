import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService, Photo } from '../services/photo';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
  standalone:false,
})
export class FotosPage {

  registroForm: FormGroup;

  constructor(
    public photoService: PhotoService,
    private fb: FormBuilder
  ) {
    this.registroForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  async takePhoto() {
    await this.photoService.takePhoto();
  }

  guardarRegistro() {
    if (this.registroForm.invalid) return;

    const lastPhoto = this.photoService.photos[0];
    if (!lastPhoto) {
      alert("Primero toma una foto");
      return;
    }

    // Actualizar foto con los datos del formulario
    lastPhoto.title = this.registroForm.value.title;
    lastPhoto.description = this.registroForm.value.description;

    // Crear copia para que no se sobreescriba
    this.photoService.updatePhoto({ ...lastPhoto });

    this.registroForm.reset();
  }

  eliminarRegistro(p: Photo) {
    this.photoService.deletePhoto(p.id!);
  }
}
