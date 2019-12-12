import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { PokemonsListComponent } from './pokemons/pokemons-list/pokemons-list.component';
import { PokemonListResolver } from './pokemons/pokemons-list/pokemons-list.resolver';
import { SigninComponent } from './home/signin/signin.component';
import { TokenGuard } from './core/auth/token/token.guard';
import { SigninGuard } from './home/signin/signin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokedex'
  },
  {
    path:'pokedex',
    component: PokemonsListComponent,
    resolve: {
      pokemons: PokemonListResolver
    }
  },
  {
    path:'login',
    component: SigninComponent,
    canActivate: [SigninGuard]
  },
  {
    path:'create/pokemon',
    loadChildren: './create/create.module#CreateModule',
    canActivate: [TokenGuard]
  },
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