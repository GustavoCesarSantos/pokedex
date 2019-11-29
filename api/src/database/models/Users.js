const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 100
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 24
  },
  level: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UsersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users', UsersSchema);