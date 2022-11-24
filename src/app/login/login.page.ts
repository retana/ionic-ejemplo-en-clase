/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['inforetana@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(5)]]
    });
  }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  async login(){
    const user = await this.authService.login(this.credentials.value.email, this.credentials.value.password);
    if (user){
      await this.spotifyService.getToken().toPromise();
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      const alert = await this.alertController.create({
        header: 'Login Error',
        message: 'Error al iniciar sesion',
        buttons: ['OK']
      });
      alert.present();
    }
  }
   async createAccount(){
    const user = await this.authService.register(this.credentials.value.email, this.credentials.value.password);
    if (user){
      await this.spotifyService.getToken().toPromise();
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      const alert = await this.alertController.create({
        header: 'Register Error',
        message: 'Error al crear cuenta',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
