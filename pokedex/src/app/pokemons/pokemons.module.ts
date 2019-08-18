import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonsListModule } from './pokemons-list/pokemons-list.module';

@NgModule({
  imports: [
    CommonModule,
    PokemonModule,
    PokemonsListModule
  ]
})
export class PokemonsModule {}