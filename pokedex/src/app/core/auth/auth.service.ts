import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from './user/user.service';

const API_URL = 'http://localhost:3000/v1';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient,
    private _userService: UserService){ }

  authenticate(name: string, password:string){
    return this._http.post(`${API_URL}/login`, { name, password }, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.body['token'];
        this._userService.setToken(authToken);
      }))
  };
};