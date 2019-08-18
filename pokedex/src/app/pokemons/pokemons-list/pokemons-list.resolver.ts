import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Pokemon } from '../pokemon/pokemon';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonListResolver implements Resolve<Observable<Pokemon[]>> {
  constructor(private _pokemonService: PokemonService){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this._pokemonService.listFromPokedexPaginated(1);
  };
 };