const bcrypt = require('bcryptjs');

const UserDao = require('./UserDao');
const messages = require('../../helpers/constant/messages');

const userDao = new UserDao();

module.exports = class UserService{
  async getUsers(pageNumber){
    const users = await userDao.getUsers(pageNumber);
    return users;
  };

  async getUser(userName){
    const user = await userDao.getUser(userName);
    
    if(!user)
      throw new Error(messages.USER_NOT_EXISTS);

    return user;
  };

  async setUser(user){
    if(await userDao.getUser(user.name))
      throw new Error(messages.USER_EXISTS);
    
    const isValid = user.isValid(user);
    if(!isValid)
      throw new Error(user.modelStateError);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    
    await userDao.setUSer(user);
  };

  async updateUser(userName, userData){
    const user = await userDao.getUser(userName);
    if(!user)
      throw new Error(messages.USER_NOT_EXISTS);
    
    if(user.name === userData.name)
      throw new Error(messages.USER_EXISTS);
  
    if(user.email === userData.email)
      throw new Error(messages.USER_EMAIL_EXISTS);

    const userUpdated = await userDao.updateUser(userName, userData);
    return await userDao.getUser(userUpdated.name);
  };

  async removeUser(userName){
    if(!await userDao.getUser(userName))
      throw new Error(messages.USER_NOT_EXISTS);
    
    await userDao.removeUser(userName);
  };
};