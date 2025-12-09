import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

const TOKEN_KEY = GlobalComponent.TOKEN_KEY;
const USER_KEY = GlobalComponent.USER_KEY;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY); 
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user =  window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
    // if (user) {
    //   return JSON.parse(user);
    // }
    // return {};
  }
}
