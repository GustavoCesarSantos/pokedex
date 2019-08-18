const mongoose = require('mongoose');

const config = require('../config');

let options = {
  useNewUrlParser: true,
  // To make Mongoose use `findOneAndUpdate()`, need set it to false.
  useFindAndModify: false,
  user: config.USER,
  pass: config.PASSWORD,
  authSource: config.AUTH_SOURCE,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 2000,
  bufferMaxEntries: 0
};

mongoose.connect(config.DATABASE, options);
mongoose.Promise = global.Promise;

mongoose.connection
  .on('connected', () => {
      console.log('Mongoose connected');
  })
  .on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
  })
  .on('disconnected', () => {
    console.error('Mongoose Connection failed');
  });