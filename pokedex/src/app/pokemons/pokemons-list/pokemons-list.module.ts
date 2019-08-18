import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsListComponent } from './pokemons-list.component';
import { NextButtonComponent } from './next-previous-button/next-button/next-button.component';
import { PreviousButtonComponent } from './next-previous-button/previous-button/previous-button.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { SearchComponent } from './search/search.component';
import { SearchInApiComponent } from './search-in-api/search-in-api.component';
import { FindByNamePipe } from './find-by-name.pipe';
import { PokemonModule } from '../pokemon/pokemon.module';


@NgModule({
  declarations: [
    PokemonsListComponent,
    NextButtonComponent,
    PreviousButtonComponent,
    PokemonsComponent,
    SearchComponent,
    SearchInApiComponent,
    FindByNamePipe,
  ],
  imports: [
    CommonModule,
    PokemonModule
  ]
})
export class PokemonsListModule { }