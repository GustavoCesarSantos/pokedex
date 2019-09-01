const TypeService = require('./TypeService');
const Type = require('./Type');
const messages = require('../../helpers/constant/messages');

const typeService = new TypeService();

module.exports = class TypeController{
  static async getTypes(req,res){
    try{
      const { page } = req.query;
      const types = await typeService.getTypes(page);
      res.status(200).json(types);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async getType(req,res){
    try{
      const name = req.params.name;
      const type = await typeService.getType(name);
      res.status(200).json(type);
    }catch(err){
      res.status(500).json({ error: messages.DEFAULT_ERROR });
    };
  };

  static async setType(req,res){
    try{
      const type = new Type(req.body);
      await typeService.setType(type);
      res.status(201).json(messages.TYPE_CREATED);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async updateType(req,res){
    try{
      const name = req.params.name;
      const data = req.body;
      const type = await typeService.updateType(name, data);
      res.status(200).json(type);
    }catch(err){
      res.status(500).json(err.message);
    };
  };

  static async removeType(req,res){
    try{
      const name = req.params.name;
      await typeService.removeType(name);
      const types = await typeService.getTypes(1);
      res.status(200).json(types);
    }catch(err){
      res.status(500).json(err.message);
    };
  };
};