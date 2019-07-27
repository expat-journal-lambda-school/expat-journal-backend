require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, process.env.JWTSECRET, options);
};

router.post('/register', (req, res) => {
  const user = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10) 
  };
  
  Users.add(user)
    .then(id => {
      id = id[0].id
      const token = generateToken({id, username: user.username});
      res.status(201).json({id, ...user, token});
    })
    .catch(error => res.status(500).json(error));
});

router.post('/login',(req, res) => {
    Users.findOneBy({username: req.body.username})
      .then(user => {
        console.log(user)
        if(bcrypt.compareSync(req.body.password, user.password)){
          const token = generateToken(user);
          res.status(200).json({...user, token})
        }
        else{
          res.status(401).json({errorMessage: 'Incorrect Password'})
        }
      })
      .catch(error => res.status(500).json(error))
});

module.exports = router;
