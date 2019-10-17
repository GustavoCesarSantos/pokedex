import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/pokemons/pokemon/pokemon';

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

  verifyIfNameAlreadyExist(pokemonName: string){
      return this._http.get(`${API_URL}/pokemons/${pokemonName}`);
  };

  verifyIfTypeAlreadyExist(pokemonType: string){
    return this._http.get(`${API_URL}/types/${pokemonType}`);
  };
};