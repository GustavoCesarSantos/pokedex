const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
});

TypesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Types', TypesSchema);