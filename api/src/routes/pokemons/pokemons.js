const urls = require('../../helpers/constant/urls');
const PokemonController = require('../../components/pokemon/PokemonController');

module.exports = (app) => {
  app.route(urls.POKEMONS)
    .get(PokemonController.getPokemons)
    .post(PokemonController.setPokemon);

  app.route(urls.POKEMON_NAME)
    .get(PokemonController.getPokemon)
    .put(PokemonController.updatePokemon)
    .delete(PokemonController.removePokemon);
}