/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public accessToken;
  public API_URL_BASE = 'https://api.spotify.com/v1/';
  constructor(private http: HttpClient) { }

  getToken(){
    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials',
        client_id: '38e3758942da4490bdf20bddee97e929',
        client_secret: 'e733b825499941e7a3b65fd55e6022ba',
      },
      encoder: new HttpUrlEncodingCodec()
    });
    return this.http.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).pipe(switchMap( (response: any) => {
      this.accessToken = response.access_token;
      sessionStorage.setItem('spotifyToken', this.accessToken);
      return of(response);
    }));
  }
  featuredPlaylist(){
    return this.http.get( this.API_URL_BASE + 'browse/featured-playlists');
  }
  getTracks(uri){
    return this.http.get( uri);
  }
}
