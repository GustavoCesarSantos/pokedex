import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { CreateRoutingModule } from './create.routing.module';

@NgModule({
  declarations: [
    CreatePokemonComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CreateRoutingModule
  ]
})
export class CreateModule { }