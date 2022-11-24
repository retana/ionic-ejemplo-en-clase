import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AvatarService } from './services/avatar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public avatar = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  public currentUser = 'currentUser';
  constructor(
    private loadingController: LoadingController,
    private avatarService: AvatarService,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = sessionStorage.getItem('userEmail');
    this.avatarService.getUserProfileImage().subscribe((data) => {
			this.avatar = data.imageUrl;
      console.log(data);
		});
  }
  async changeImage() {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera // Camera, Photos or Prompt!
		});

		if (image) {
			const loading = await this.loadingController.create();
			await loading.present();

			const result = await this.avatarService.uploadImage(image);
			loading.dismiss();

			if (!result) {
				const alert = await this.alertController.create({
					header: 'Fallo al subir imagen',
					message: 'Hubo un problema al subir su imagen.',
					buttons: ['OK']
				});
				await alert.present();
			}
		}
	}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
