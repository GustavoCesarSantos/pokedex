const Users = require('../../database/models/Users');

module.exports = class UserDao{
  async getUsers(pageNumber = 1){
    const users = await Users.paginate({}, { page: pageNumber, limit: 12 });
    return users; 
  };

  async getUser(userId){
    const user = await Users.findById({ _id: userId });
    return user;
  };

  async setUSer(user){
    await Users.create(user);
  };

  async updateUser(userId, userData){
    const user = await Users.findByIdAndUpdate({ _id: userId }, userData, { new: true });
    return user
  };

  async removeUser(userId){
    await Users.findByIdAndRemove({ _id: userId });
  };
};