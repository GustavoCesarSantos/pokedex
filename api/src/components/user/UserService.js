const bcrypt = require('bcryptjs');

const UserDao = require('./UserDao');
const messages = require('../../helpers/constant/messages');

const userDao = new UserDao();

module.exports = class UserService{
  async getUsers(pageNumber){
    const users = await userDao.getUsers(pageNumber);
    return users;
  };

  async getUser(userId){
    const user = await userDao.getUser(userId);
    
    if(!user)
      throw new Error(messages.USER_NOT_EXISTS);

    return user;
  };

  async setUser(user){
    const users = await userDao.getUsers();
    users.docs.map(userData => {
      if(userData.email === user.email)
        throw new Error(messages.USER_EXISTS);
    });
    
    const isValid = user.isValid(user);
    if(!isValid)
      throw new Error(user.modelStateError);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    
    await userDao.setUSer(user);
  };

  async updateUser(userId, userData){
    const user = await userDao.getUser(userId);
    if(!user)
      throw new Error(messages.USER_NOT_EXISTS);

    if(userData.email)
      if(user.email === userData.email)
        throw new Error(messages.USER_EMAIL_EXISTS);

    const userUpdated = await userDao.updateUser(userId, userData);
    return await userDao.getUser(userUpdated._id);
  };

  async removeUser(userId){
    if(!await userDao.getUser(userId))
      throw new Error(messages.USER_NOT_EXISTS);
    
    await userDao.removeUser(userId);
  };
};