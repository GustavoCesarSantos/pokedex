import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';

const API_URL = 'http://localhost:3000/v1/pokemons';

@Injectable({ providedIn: 'root' })
export class CreatePokemonService { 
  constructor(private _http: HttpClient){ }

  createPokemon(pokemon: Pokemon){
    return this._http.post(`${API_URL}`, pokemon);
  };

  verifyIfNameAlreadyExist(pokemonName: string){
    return this._http.get(`${API_URL}/${pokemonName}`);
  };
};