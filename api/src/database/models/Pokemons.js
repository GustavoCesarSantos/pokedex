const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PokemonsSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  types: {
    type: Array,
    required: true,
    lowercase: true
  },
  weaknesses: {
    type: Array,
    required: true,
    lowercase: true
  },
});

PokemonsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Pokemons', PokemonsSchema);