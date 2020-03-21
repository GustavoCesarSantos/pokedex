import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { LevelService } from './level/level.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _levelService: LevelService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this._tokenService.hasToken()){
      const token = this._tokenService.getToken();
      const level = this._levelService.getLevel();

      req = req.clone({
        setHeaders: {
          'x-access-token': `Bearer ${token}`,
          'level': level
        }
      })
    }

    return next.handle(req);
  }
}