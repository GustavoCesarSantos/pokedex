const Types = require('../../database/models/Types');

module.exports = class TypeDao{
  async getTypes(pageNumber = 1){
    const types = await Types.paginate({}, { page: pageNumber, limit: 18 });
    return types;
  };

  async getType(typeName){
    const type = await Types.findOne({ name: typeName });
    return type;
  };

  async setType(type){
    await Types.create(type);
  };

  async updateType(typeName, typeData){
    const type = await Types.findOneAndUpdate({ name: typeName }, typeData, { new: true });
    return type;
  };

  async removeType(typeName){
    await Types.deleteOne({ name: typeName });
  };
};