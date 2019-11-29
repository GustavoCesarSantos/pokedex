const Joi = require('@hapi/joi');

module.exports = class User{
  constructor(user){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.level = user.level;
    this.date = user.date
  }


}