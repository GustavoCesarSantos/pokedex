import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { CreatePokemonService } from './create-pokemon.service';

@Injectable()
export class NameValidatorService{ 
  constructor(private _createPokemonService: CreatePokemonService){ }

  verifyIfNameAlreadyExist(){
    return(control: AbstractControl) => {
      return control.valueChanges.pipe(debounceTime(300))
        .pipe(switchMap(pokemonName => this._createPokemonService.verifyIfNameAlreadyExist(pokemonName)))
          .pipe(map(alreadyExist => alreadyExist ? { nameAlreadyExist: true }: null))
            .pipe(first());
    };
  };
};