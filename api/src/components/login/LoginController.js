const Login = require('./Login');
const LoginService = require('../login/LoginService');

const loginService = new LoginService();

module.exports = class LoginController{
  static async login(req, res){
    try {
      const login = new Login(req.body);
      const token = await loginService.login(login);
      res.status(200).json({ token: token });
    }catch(err) {
      res.status(500).json(err.message);
    }
  };
};