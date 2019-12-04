const jwt = require('jsonwebtoken');

const config = require('../config/config');
const messages = require('../helpers/constant/messages');

module.exports = async function verifyToken(req, res, next){
  try{
    let token = req.headers['x-access-token'] || req.headers['Authorization'];
    if(token.startsWith('Bearer'))
      token = token.slice(7, token.length);
    
    if(!token)
      return res.status(401).json(messages.TOKEN_NOT_PROVIDED);
    
    await jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if(err)
        throw new Error(messages.TOKEN_INVALID);
      
      res.user = decoded;
      next();
    });
  }catch (err){
    res.status(500).json({ 'ERROR': err });
  };
};