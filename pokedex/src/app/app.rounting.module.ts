import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsListComponent } from './pokemons/pokemons-list/pokemons-list.component';
import { PokemonListResolver } from './pokemons/pokemons-list/pokemons-list.resolver';
import { CreatePokemonComponent } from './create/create-pokemon/create-pokemon.component';

const routes: Routes = [
  {
    path:'',
    component: PokemonsListComponent,
    resolve: {
      pokemons: PokemonListResolver
    }
  },
  {
    path:'create/pokemon',
    component: CreatePokemonComponent,
  }
]

@NgModule({ 
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }