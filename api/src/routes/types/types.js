const urls = require('../../helpers/constant/urls');
const TypeController = require('../../components/type/TypeController');

module.exports = (app) => {
  app.route(urls.TYPES)
    .get(TypeController.getTypes)
    .post(TypeController.setType);

  app.route(urls.TYPE_NAME)
    .get(TypeController.getType)
    .put(TypeController.updateType)
    .delete(TypeController.removeType);
}