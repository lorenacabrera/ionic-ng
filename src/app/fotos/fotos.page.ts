import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService, Photo } from '../services/photo';

@Component({
  selector: 'app-fotos',
  templateUrl: 'fotos.page.html',
  styleUrls: ['fotos.page.scss'],
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

  // Captura foto con la cámara
  addPhotoToGallery() {
    this.photoService.takePhoto();
  }

  // Guardar registro en el array
  guardarRegistro() {
    if (this.registroForm.valid) {
      const newPhoto: Photo = {
        ...this.registroForm.value,
        base64: this.photoService.photos[0]?.base64 || ''
      };
      this.photoService.addPhoto(newPhoto);
      this.registroForm.reset();
    }
  }

  // Eliminar
  eliminarRegistro(photo: Photo) {
    if (photo.id != null) this.photoService.deletePhoto(photo.id);
  }
}
