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
    
    const { email, password } = login;
    
    let idUser = '';
    const users = await userService.getUsers();
    users.docs.map(user => {
      if(user.email === email)
        idUser = user.id;
    });
    if(idUser === '')
      throw new Error(messages.LOGIN_DEFAULT_ERROR);
    
    const userExist = await userService.getUser(idUser);
    const validPass = await bcrypt.compare(password, userExist.password);
    if(!validPass)
      throw new Error(messages.LOGIN_DEFAULT_ERROR);
    
    const token = jwt.sign({ _id: userExist._id }, config.TOKEN_SECRET, { expiresIn: 86400 });
    return token;
  }
}