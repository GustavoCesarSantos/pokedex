const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserService = require('../user/UserService');
const messages = require('../../helpers/constant/messages');
const config = require('../../config/config');

const userService = new UserService();

module.exports = class LoginService{
  async login(login){
    const isValid = login.isValid(login);
    if(!isValid)
      throw new Error(login.modelStateError);
    
    const { name, password } = login;
    const userExist = await userService.getUser(name);
    if(!userExist)
      throw new Error(messages.LOGIN_DEFAULT_ERROR);

    const validPass = await bcrypt.compare(password, userExist.password);
    if(!validPass)
      throw new Error(messages.LOGIN_DEFAULT_ERROR);
    
    const token = jwt.sign({ _id: userExist._id }, config.TOKEN_SECRET, { expiresIn: 86400 });
    return token;
  }
}