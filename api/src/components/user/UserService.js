const UserDao = require('./UserDao');
const messages = require('../../helpers/constant/messages');

const userDao = new UserDao();

module.exports = class UserService{
  async getUsers(pageNumber){
    const users = await userDao.getUsers(pageNumber);
    return users;
  };

  async getUser(userEmail){
    const user = await userDao.getUser(userEmail);
    return user;
  };

  async setUser(user){
    if(await userDao.getUser(user.email))
      throw new Error(messages.USER_EXISTS);
    
    const isValid = user.isValid(user);
    if(!isValid)
      throw new Error(user.modelStateError);
    
    await userDao.setUSer(user);
  };

  async updateUser(userEmail, userData){
    if(await userDao.getUser(userEmail)){
      const user = await userDao.updateUser(userEmail, userData);
      return await userDao.getUser(user.email);
    }else{
      throw new Error(messages.USER_NOT_EXISTS);
    };
  };

  async removeUser(userEmail){
    if(await userDao.getUser(userEmail)){
      await userDao.removeUser(userEmail);
    }else{
      throw new Error(messages.USER_NOT_EXISTS);
    };
  };
};