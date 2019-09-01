const PokemonService = require('./PokemonService');
const Pokemon = require('./Pokemon');
const messages = require('../../helpers/constant/messages');

const TypeService = require('../type/TypeService');

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
      const name = req.params.name;
      const pokemon = await pokemonService.getPokemon(name);
      res.status(200).json(pokemon);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async setPokemon(req,res){
    try{

      const pokemon = new Pokemon(req.body);
      
      const typeService = new TypeService();
      const objectTypes = await typeService.getTypes();
      const arrayTypes = [];
      objectTypes.docs.map( type => arrayTypes.push(type.name));
      const isValid = pokemon.isValid(arrayTypes);

      if(isValid){
        await pokemonService.setPokemon(pokemon);
        res.status(201).json(messages.POKEMON_CREATED);
      }else{
        throw new Error(pokemon.modelStateError);
      }
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async updatePokemon(req,res){
    try{
      const name = req.params.name;
      const data = req.body;
      const pokemon = await pokemonService.updatePokemon(name, data);
      res.status(200).json(pokemon);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async removePokemon(req,res){
    try{
      const name = req.params.name;
      await pokemonService.removePokemon(name);
      const pokemons = await pokemonService.getPokemons(1);
      res.status(200).json(pokemons);
    }catch(err){
      res.status(500).json(err.message);
    };
  };
};