import { Injectable } from "@angular/core";

const TOKEN = 'token';

@Injectable()
export class TokenService{
  getToken() {
    return window.localStorage.getItem(TOKEN);
  }
  
  setToken(token) {
    window.localStorage.setItem(TOKEN, token);
  }
  
  hasToken() {
    if(!this.getToken() || this.getToken() == 'null')
      return false;

    return true;
  }

  removeToken() {
    window.localStorage.removeItem(TOKEN);
  }
}