const TypeDao = require('./TypeDao');
const messages = require('../../helpers/constant/messages');

const typeDao = new TypeDao();

module.exports = class TypeService{
  async getTypes(pageNumber){
    const types = await typeDao.getTypes(pageNumber);
    return types;
  };

  async getType(typeName){
    const type = await typeDao.getType(typeName);
    return type;
  };

  async setType(type){
    if(await typeDao.getType(type.name)){
      throw new Error(messages.TYPE_EXISTS);
    }else{
      await typeDao.setType(type);
    };
  };

  async updateType(typeName, typeData){
    if(await typeDao.getType(typeName)){
      const type = await typeDao.updateType(typeName, typeData);
      return await typeDao.getType(type.name);
    }else{
      throw new Error(messages.TYPE_NOT_EXISTS);
    };
  };

  async removeType(typeName){
    if(await typeDao.getType(typeName)){
      await typeDao.removeType(typeName);
    }else{
      throw new Error(messages.TYPE_NOT_EXISTS);
    };
  };
};