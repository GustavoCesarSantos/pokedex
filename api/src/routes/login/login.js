const urls = require('../../helpers/constant/urls');
const LoginController = require('../../components/login/LoginController');

module.exports = (app) => {
  app.route(urls.LOGIN)
    .post(LoginController.login);
}