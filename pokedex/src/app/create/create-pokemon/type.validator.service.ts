import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { CreatePokemonService } from './create-pokemon.service';

@Injectable()
export class TypeValidatorService{ 
  constructor(private _createPokemonService: CreatePokemonService){ }

  verifyIfTypeAlreadyExist(){
    return(control: AbstractControl) => {
      return control.valueChanges.pipe(debounceTime(300))
        .pipe(switchMap(pokemonType => this._createPokemonService.verifyIfTypeAlreadyExist(pokemonType)))
          .pipe(map(alredyExist => !alredyExist ? { typeNotExist: true }:null))
            .pipe(first());
    };
  };
};