import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [
    PokemonComponent
  ],
  exports: [
    PokemonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PokemonModule { }