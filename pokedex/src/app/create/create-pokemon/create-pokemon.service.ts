import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';
import { Type } from 'src/app/pokemons/pokemon/type';

const API_URL = 'http://localhost:3000/v1';

@Injectable()
export class CreatePokemonService { 
  constructor(private _http: HttpClient){ }

  createPokemon(pokemon: Pokemon){
    try{
      return this._http.post(`${API_URL}/pokemons`, pokemon);
    }catch(err){
      throw new Error(err);
    }
  };

  listCreatedPokemonTypes(){
    return this._http.get<Type[]>(`${API_URL}/types`);
  };

  verifyIfNameAlreadyExist(pokemonName: string){
      return this._http.get(`${API_URL}/pokemons/${pokemonName}`);
  };
};