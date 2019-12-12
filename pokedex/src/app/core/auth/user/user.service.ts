import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable()
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);

  constructor(private _tokenService: TokenService){ 
    if(this._tokenService.hasToken())
      this._decodeAndNotify();
  }
  
  private _decodeAndNotify(){
    const token = this._tokenService.getToken();
    const user = jwtDecode(token) as User;
    this.userSubject.next(user);
  }

  getUser(){
    return this.userSubject.asObservable();
  }

  setToken(token){
    this._tokenService.setToken(token);
    this._decodeAndNotify();
  }

  isLogged(){
    return this._tokenService.hasToken();
  }

  logout(){
    this._tokenService.removeToken();
    this.userSubject.next(null);
  }
}