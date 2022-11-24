import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public featuredPlaylist;
  constructor(
    private spotifyService: SpotifyService,
    private toastService: ToastController,
    private router: Router) {
    this.getFeaturedPlaylist();
  }

  async getFeaturedPlaylist(){
    try{
      this.featuredPlaylist = await this.spotifyService.featuredPlaylist().toPromise();
      console.log(this.featuredPlaylist);
    }catch(e){
      console.log('Erro controlado ', e.error.error.message);
      this.toastCreate( e.error.error.message);
    }
  }

  async toastCreate(message: string){
    const toast = await this.toastService.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'middle'
    });

    await toast.present();
  }

  viewDetail(item){
    this.router.navigate(['/detail'], {queryParams: {data: JSON.stringify(item)}
  });
  }
}
