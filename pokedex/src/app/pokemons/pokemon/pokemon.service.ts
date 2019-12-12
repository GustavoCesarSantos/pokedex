import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Pokemon } from './pokemon';

const API_URL = 'http://localhost:3000/v1';

@Injectable()
export class PokemonService { 
  constructor(private _http: HttpClient) { }
  
  listFromPokedexPaginated(page: number){
    const params = new HttpParams().append('page', page.toString());
    return this._http.get<Pokemon[]>(`${API_URL}/pokemons`, { params });
  };

  listFromPokemonName(pokemonName: string){
    return this._http.get<Pokemon[]>(`${API_URL}/pokemons/${pokemonName}`);
  }
};