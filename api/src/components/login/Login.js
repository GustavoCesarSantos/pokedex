const Joi = require('@hapi/joi');

module.exports = class Login{
  constructor(login){
    this.name = login.name;
    this.password = login.password;
    this.modelStateError = '';
  }

  isValid(loginData){
    const loginSchemaValidate = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      password: Joi.string().min(6).max(24).required(),
      modelStateError: Joi.optional()
    });

    const { error } = loginSchemaValidate.validate(loginData);
    if(error){
      this.modelStateError = error.details[0].message;
      return false;
    };

    return true;
  };
};