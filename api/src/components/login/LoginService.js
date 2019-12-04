const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserService = require('../user/UserService');
const messages = require('../../helpers/constant/messages');
const config = require('../../config/config');

const userService = new UserService();

module.exports = class LoginService{
  async login(loginData){
    const isValid = loginData.isValid(loginData);
    if(!isValid)
      throw new Error(login.modelStateError);
    
    const { email, password } = loginData;
    const userExist = await userService.getUser(email);
    if(!userExist)
      throw new Error(messages.LOGIN_DEFAULT_ERROR);

    const validPass = await bcrypt.compare(password, userExist.password);
    if(!validPass)
      throw new Error(messages.LOGIN_DEFAULT_ERROR);
    
    const token = jwt.sign({ _id: userExist._id }, config.TOKEN_SECRET, { expiresIn: 86400 });
    return token;
  }
}