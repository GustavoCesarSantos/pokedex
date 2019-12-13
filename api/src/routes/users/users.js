const urls = require('../../helpers/constant/urls');
const UserController = require('../../components/user/UserController');

module.exports = (app) => {
  app.route(urls.USERS)
    .get(UserController.getUsers)
    .post(UserController.setUser);
  
  app.route(urls.USER_ID)
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.removeUser);
}