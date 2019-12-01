const PokemonDao = require('./PokemonDao');
const messages = require('../../helpers/constant/messages');

const TypeService = require('../type/TypeService');

const pokemonDao = new PokemonDao();

module.exports = class PokemonService{
  async getPokemons(pageNumber){
    const pokemons = await pokemonDao.getPokemons(pageNumber);
    return pokemons;
  };

  async getPokemon(pokemonName){
    const pokemon = await pokemonDao.getPokemon(pokemonName);

    if(!pokemon)
      throw new Error(messages.POKEMON_NOT_EXISTS);

    return pokemon;
  };

  async setPokemon(pokemon){
    if(await pokemonDao.getPokemon(pokemon.name))
      throw new Error(messages.POKEMON_EXISTS);

    const typeService = new TypeService();
    const objectTypes = await typeService.getTypes();
    const arrayTypes = [];
    objectTypes.docs.map( type => arrayTypes.push(type.name));
    
    const isValid = pokemon.isValid(arrayTypes);
    if(!isValid)
      throw new Error(pokemon.modelStateError);
    
    await pokemonDao.setPokemon(pokemon);
  };

  async updatePokemon(pokemonName, pokemonData){
    if(await pokemonDao.getPokemon(pokemonName)){
      const pokemon = await pokemonDao.updatePokemon(pokemonName, pokemonData);
      return await pokemonDao.getPokemon(pokemon.name);
    }else{
      throw new Error(messages.POKEMON_NOT_EXISTS);
    };
  };

  async removePokemon(pokemonName){
    if(await pokemonDao.getPokemon(pokemonName)){
      await pokemonDao.removePokemon(pokemonName);
    }else{
      throw new Error(messages.POKEMON_NOT_EXISTS);
    };
  };
};