const Joi = require('@hapi/joi');

module.exports = class User{
  constructor(user){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.level = user.level;
    this.modelStateError = '';
  }

  isValid(userData){
    const userSchemaValidate = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).max(24).required(),
      level: Joi.string().required(),
      modelStateError: Joi.optional()
    });
    
    const { error } = userSchemaValidate.validate(userData);
    if(error){
      this.modelStateError = error.details[0].message;
      return false;
    };

    return true;
  };
};