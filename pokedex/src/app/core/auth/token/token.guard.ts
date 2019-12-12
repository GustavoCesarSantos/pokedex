import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class TokenGuard implements CanActivate{
  constructor(private _userService: UserService){ }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    const isLogged = this._userService.isLogged();

    if(isLogged === false)
      return false;
    
    return true;
  }
}