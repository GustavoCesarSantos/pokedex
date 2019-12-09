import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  loginForm: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router){ }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  };

  login(){
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    
    this._authService.authenticate(userName, password)
      .subscribe(
        () => this._router.navigate(['']),
        error => {
          console.error(error);
          this.loginForm.reset();
         }
      );
  };
};