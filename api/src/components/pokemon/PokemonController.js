const Pokemon = require('./Pokemon');
const PokemonService = require('./PokemonService');
const messages = require('../../helpers/constant/messages');

const pokemonService = new PokemonService();

module.exports = class PokemonController{
  static async getPokemons(req,res){
    try{
      const { page } = req.query;
      const pokemons = await pokemonService.getPokemons(page);
      res.status(200).json(pokemons);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async getPokemon(req,res){
    try{
      const { name } = req.params;
      const pokemon = await pokemonService.getPokemon(name);
      res.status(200).json(pokemon);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async setPokemon(req,res){
    try{
      const pokemon = new Pokemon(req.body);
      await pokemonService.setPokemon(pokemon);
      res.status(201).json(messages.POKEMON_CREATED);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async updatePokemon(req,res){
    try{
      const { name } = req.params;
      const data = req.body;
      const pokemon = await pokemonService.updatePokemon(name, data);
      res.status(200).json(pokemon);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async removePokemon(req,res){
    try{
      const { name } = req.params;
      await pokemonService.removePokemon(name);

      const pokemons = await pokemonService.getPokemons();
      res.status(200).json(pokemons);
    }catch(err){
      res.status(500).json(err.message);
    };
  };
};