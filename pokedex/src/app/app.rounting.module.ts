import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { PokemonsListComponent } from './pokemons/pokemons-list/pokemons-list.component';
import { PokemonListResolver } from './pokemons/pokemons-list/pokemons-list.resolver';
import { CreatePokemonComponent } from './create/create-pokemon/create-pokemon.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokedex'
  },
  {
    path:'pokedex',
    component: HomeComponent,
    children: [
      {
        path:'',
        component: PokemonsListComponent,
        resolve: {
          pokemons: PokemonListResolver
        }
      },
      
    ]
  },
  {
    path:'create/pokemon',
    loadChildren: './create/create.module#CreateModule'
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