import { Injectable, isStandalone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:3000/photos'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

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

  // Añadir registro en memoria y al backend
  public addPhoto(photo: Photo) {
    photo.id = this.nextId++;
    this.photos.unshift(photo);

    // Enviar al backend
    this.http.post(this.apiUrl, photo).subscribe({
      next: () => console.log('Foto enviada al backend'),
      error: err => console.error('Error al enviar la foto', err)
    });
  }

  // Eliminar registro (en memoria, opcional backend)
  public deletePhoto(id: number) {
    this.photos = this.photos.filter(p => p.id !== id);
  }

  // Actualizar registro (en memoria, opcional backend)
  public updatePhoto(updated: Photo) {
    const index = this.photos.findIndex(p => p.id === updated.id);
    if (index > -1) this.photos[index] = updated;
  }
}
