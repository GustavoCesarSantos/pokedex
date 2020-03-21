import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';
import { LevelService } from '../level/level.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: User;
  private _userSubject = new BehaviorSubject<User>(null);

  constructor(
    private _tokenService: TokenService,
    private _levelService: LevelService
  ){ 
    if(this._tokenService.hasToken())
      this._decodeAndNotify();
  }
  
  private _decodeAndNotify(){
    const token = this._tokenService.getToken();
    this._user = jwtDecode(token);
    this._userSubject.next(this._user);
  }

  getUser(){
    return this._userSubject.asObservable();
  }

  setToken(token){
    this._tokenService.setToken(token);
    this._decodeAndNotify();
    this._levelService.setLevel(this._user.lvl);
  }

  isLogged(){
    return this._tokenService.hasToken();
  }

  logout(){
    this._tokenService.removeToken();
    this._userSubject.next(null);
  }
}