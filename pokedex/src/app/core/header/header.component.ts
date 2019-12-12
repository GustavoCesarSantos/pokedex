import { Component } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../auth/user/user';
import { UserService } from '../auth/user/user.service';

@Component({
  selector: 'p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ UserService ]
})
export class HeaderComponent {
  user$: Observable<User>;

  constructor(private _userService: UserService,
    private _router: Router) {
    this.user$ = this._userService.getUser();
  }

  logout(){
    this._userService.logout();
    this._router.navigate(['login']);
  }
 }