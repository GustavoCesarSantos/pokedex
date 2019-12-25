const urls = require('../../helpers/constant/urls');
const PokemonController = require('../../components/pokemon/PokemonController');
const verifyToken = require('../../middleware/verifyToken');
const verifyLevel = require('../../middleware/verifyLevel');

module.exports = (app) => {
  app.route(urls.POKEMONS)
    .get(PokemonController.getPokemons)
    .post([ verifyToken, verifyLevel ], PokemonController.setPokemon);

  app.route(urls.POKEMON_NAME)
    .get(PokemonController.getPokemon)
    .put(PokemonController.updatePokemon)
    .delete(PokemonController.removePokemon);
}