import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';

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

  ]
})

export class HomeModule { }