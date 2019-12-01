const Users = require('../../database/models/Users');

module.exports = class UserDao{
  async getUsers(pageNumber = 1){
    const users = await Users.paginate({}, { page = pageNumber, limit = 12 });
    return users; 
  };

  async getUser(userEmail){
    const user = await Users.findOne({ email: userEmail });
    return user;
  };

  async setUSer(user){
    await Users.create(user);
  };

  async updateUser(userEmail, userData){
    const user = await Users.findByIdAndUpdate({ email: userEmail }, userData, { new: true });
    return user
  };

  async removeUser(userEmail){
    await Users.deleteOne({ email: userEmail });
  };
};