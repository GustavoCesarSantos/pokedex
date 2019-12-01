const User = require('./User');
const UserService = require('./UserService');
const messages = require('../../helpers/constant/messages');

const userService = new UserService();

module.exports = class UserController{
  static async getUsers(req, res){
    try{
      const { page } = req.query;
      const users = await userService.getUsers(page);
      res.status(200).json(users);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async getUser(req, res){
    try{
      const { email } = req.params;
      const user = await userService.getUser(email);
      res.status(200).json(user);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async setUser(req, res){
    try{
      const user = new User(req.body);
      await userService.setUser(user);
      res.status(201).json(messages.USER_CREATED);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async updateUser(req, res){
    try {
      const { email } = req.params;
      const data = req.body;
      const user = await userService.updateUser(email, data);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    };
  };

  static async removeUser(req, res){
    try {
      const { email } = req.params;
      await userService.removeUser(email);

      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err.message);
    };
  };
};