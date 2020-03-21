const bcrypt = require('bcryptjs');

const message = require('../helpers/constant/messages');

module.exports = async function verifyLevelAdmin(req, res, next){
  try {
    const levelHashed = req.headers['level'];
    if(!levelHashed)
      return res.status(401).json(message.LEVEL_NOT_PROVIDED);
    
    const validPass = await bcrypt.compare('admin', levelHashed);
    if(!validPass)
      return res.status(401).json(message.LEVEL_UNATHORIZED);
    
    next()
  }catch (err) {
    res.status(500).json({ 'ERROR': err });
  };
};