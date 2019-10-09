import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})

export class HomeModule { }