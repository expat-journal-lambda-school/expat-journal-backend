require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWTSECRET, (error, decodedToken) => {
    if(error){
      res.status(401).send('no, no, no');
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
