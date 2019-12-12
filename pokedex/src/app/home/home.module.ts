import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { UserService } from '../core/auth/user/user.service';

@NgModule({
  declarations: [
    HomeComponent,
    SigninComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})

export class HomeModule { }