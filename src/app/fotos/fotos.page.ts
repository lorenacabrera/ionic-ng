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

  guardarRegistro() {
    if (this.registroForm.valid) {
      this.photoService.addPhoto(this.registroForm.value); // Se envía al backend
      this.registroForm.reset();
    }
  }
  

  // Eliminar
  eliminarRegistro(photo: Photo) {
    if (photo.id != null) this.photoService.deletePhoto(photo.id);
  }
}
