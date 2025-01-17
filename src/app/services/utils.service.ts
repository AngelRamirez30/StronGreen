import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  modalCtrl = inject(ModalController);
  constructor(private router: Router) { }

  routerlink(path: string){
    this.router.navigate([path]);
  }
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  loading(){
    return this.loadingCtrl.create({spinner: "crescent", message: "Cargando..."});
  }
  saveLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
  async getModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }
  
  dismissModal(data?: any){
    this.modalCtrl.dismiss(data);
  }

  async takePicture(promptLabelHeader: string){
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto',
    });
  }
}
