import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Photo {
  base64: string;
  title?: string;
  description?: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  private nextId = 1;

  constructor() {}

  // Captura foto
  public async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    const newPhoto: Photo = {
      id: this.nextId++,
      base64: 'data:image/jpeg;base64,' + image.base64String
    };

    this.photos.unshift(newPhoto);
  }

  // Añadir registro manual (para el CRUD)
  public addPhoto(photo: Photo) {
    photo.id = this.nextId++;
    this.photos.unshift(photo);
  }

  // Eliminar registro
  public deletePhoto(id: number) {
    this.photos = this.photos.filter(p => p.id !== id);
  }

  // Actualizar registro
  public updatePhoto(updated: Photo) {
    const index = this.photos.findIndex(p => p.id === updated.id);
    if (index > -1) this.photos[index] = updated;
  }
}
