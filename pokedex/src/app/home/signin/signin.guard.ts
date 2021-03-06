import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/auth/user/user.service';

@Injectable({ providedIn: 'root' })
export class SigninGuard implements CanActivate{
  constructor(private _userService: UserService,
      private _router: Router){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    const isLogged = this._userService.isLogged();

    if(isLogged === true){
      this._router.navigate(['']);
      return false;
    }

    
    return true;
  }
}