module.exports = class Pokemon{
  constructor(pokemon){
    this.picture = pokemon.picture;
    this.name = pokemon.name;
    this.types = pokemon.types;
    this.weaknesses = pokemon.weaknesses;
    this.modelStateError = '';
  }

  isValid(arrayTypes){
    const typesFoundedResponse = [];
    this.types.map(type => typesFoundedResponse.push(arrayTypes.includes(type)));
    const verifyIfExistTypeResponseFalse = typesFoundedResponse.some(answer => !answer);

    const weaknessesFoundedResponse = [];
    this.weaknesses.map(weaknesse => weaknessesFoundedResponse.push(arrayTypes.includes(weaknesse)));
    const verifyIfExistWeaknesseResponseFalse = weaknessesFoundedResponse.some(answer => !answer);

    if(verifyIfExistTypeResponseFalse){
      this.modelStateError = 'This pokemon type is invalid';
      return false;
    }else if(verifyIfExistWeaknesseResponseFalse){
      this.modelStateError = 'This pokemon weaknesses is invalid';
      return false;
    };

    return true;
  };
};