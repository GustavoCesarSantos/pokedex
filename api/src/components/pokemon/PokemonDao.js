const Pokemons = require('../../database/models/Pokemons');

module.exports = class PokemonDao{
  async getPokemons(pageNumber){
    const pokemons = await Pokemons.paginate({}, { page: pageNumber, limit: 12 });
    return pokemons;
  };

  async getPokemon(pokemonName){
    const pokemon = await Pokemons.findOne({ name: pokemonName });
    return pokemon;
  };

  async setPokemon(pokemon){
    await Pokemons.create(pokemon);
  };

  async updatePokemon(pokemonName, pokemonData){
    const pokemon = await Pokemons.findOneAndUpdate({ name: pokemonName }, pokemonData, { new: true });
    return pokemon;
  };

  async removePokemon(pokemonName){
    await Pokemons.deleteOne({ name: pokemonName });
  };
};