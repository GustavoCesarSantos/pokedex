import { Pipe, PipeTransform } from '@angular/core';

import { Pokemon } from '../pokemon/pokemon';

@Pipe({ name: 'findByName' })
export class FindByNamePipe implements PipeTransform{
  transform(pokemons: Pokemon[], nameQuery: string) {
    nameQuery = nameQuery.trim().toLowerCase();

    /*if(nameQuery){
      console.log('nameQuery: ', nameQuery);
      console.log('array original', pokemons);
      return pokemons.filter( pokemon => pokemon.name.toLowerCase().includes(nameQuery));
    }else{
      console.log('asdasd',pokemons);
      return pokemons;
    }*/
    return nameQuery ? pokemons.filter( pokemon => pokemon.name.toLowerCase().includes(nameQuery)): pokemons;
  };
};