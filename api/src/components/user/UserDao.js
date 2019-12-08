const Users = require('../../database/models/Users');

module.exports = class UserDao{
  async getUsers(pageNumber = 1){
    const users = await Users.paginate({}, { page: pageNumber, limit: 12 });
    return users; 
  };

  async getUser(userName){
    const user = await Users.findOne({ name: userName });
    return user;
  };

  async setUSer(user){
    await Users.create(user);
  };

  async updateUser(userName, userData){
    const user = await Users.findOneAndUpdate({ name: userName }, userData, { new: true });
    return user
  };

  async removeUser(userName){
    await Users.deleteOne({ name: userName });
  };
};