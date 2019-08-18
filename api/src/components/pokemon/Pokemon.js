const PokemonTypes = require('../../helpers/pokemon/Types');

module.exports = class Pokemon{
  constructor(pokemon){
    this.picture = pokemon.picture;
    this.name = pokemon.name;
    this.types = pokemon.types;
    this.weaknesses = pokemon.weaknesses;
    this.modelStateError = '';
  }

  get isValid(){
    const typesFounded = [];
    this.types.map(type => typesFounded.push(PokemonTypes.types.includes(type)));
    const verifyIfExistTypeFalse = typesFounded.some(answer => !answer);

    const weaknessesFounded = [];
    this.weaknesses.map(weaknesse => weaknessesFounded.push(PokemonTypes.types.includes(weaknesse)));
    const verifyIfExistWeaknesseFalse = weaknessesFounded.some(answer => !answer);

    if(verifyIfExistTypeFalse){
      this.modelStateError = 'This pokemon type is invalid';
      return false;
    }else if(verifyIfExistWeaknesseFalse){
      this.modelStateError = 'This pokemon weaknesses is invalid';
      return false;
    };

    return true;
  };
};