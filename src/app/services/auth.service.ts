import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register( email: any, password: any){
    try{
      const currentUser = await createUserWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('userId', currentUser.user.uid);
      sessionStorage.setItem('userEmail', currentUser.user.email);
      return currentUser;
    } catch(e){
      console.log(e);
      return null;
    }
  }
  async login( email: any, password: any){
    try{
      const currentUser = await signInWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('userId', currentUser.user.uid);
      sessionStorage.setItem('userEmail', currentUser.user.email);
      return currentUser;
    }catch(e){
      console.log(e);
      return null;
    }
  }
  logout(){
    sessionStorage.clear();
    return signOut(this.auth);
  }
}
