import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public playlist: any;
  public playlistTracks: any;
  constructor(private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private domSanitizer: DomSanitizer) {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.playlist = JSON.parse(params.data);
      this.loadTracks(this.playlist.tracks.href+'?limit=3');
    });
  }

  ngOnInit() {
  }

  async loadTracks(uri){
    this.playlistTracks =await this.spotifyService.getTracks(uri).toPromise();
  }

  validateUrl(uri){
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed?uri='+uri);
  }
}
