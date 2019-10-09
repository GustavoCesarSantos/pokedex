import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';

const routes: Routes = [
  {
    path:'',
    component: CreatePokemonComponent,
  }
]

@NgModule({ 
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CreateRoutingModule { }