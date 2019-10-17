import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { CreateRoutingModule } from './create.routing.module';
import { CreatePokemonService } from './create-pokemon/create-pokemon.service';
import { NameValidatorService } from './create-pokemon/name.validator.service';
import { TypeValidatorService } from './create-pokemon/type.validator.service';

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
  ],
  providers: [
    CreatePokemonService,
    NameValidatorService,
    TypeValidatorService
  ]
})
export class CreateModule { }