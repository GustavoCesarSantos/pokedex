const message = require('../helpers/constant/messages');

module.exports = async function verifyLevel(req, res, next){
  try {
    let level = req.headers['level'];
    if(!level)
      return res.status(401).json(message.LEVEL_NOT_PROVIDED);
    
    if(level !== 'admin')
      return res.status(401).json(message.LEVEL_UNATHORIZED);
    
    next()
  }catch (err) {
    res.status(500).json({ 'ERROR': err });
  };
};