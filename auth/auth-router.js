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
    .then(newUser => {
      const token = generateToken(newUser);
      res.status(201).json({token})
    })
    .catch(error => res.status(500).json(error));
});

router.get('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username}).first()
    .then(user => {
      if(user){
        if(bcrypt.compareSync(password, user.password)){
          const token = generateToken(user);
          res.status(200).json({token})
        }
        else{
          res.status(401).json({errorMessage: 'Incorrect Password'})
        }
      }
      else{
        res.status(401).json({errorMessage: 'Incomplete Credentials'})
      }
    })
    .catch(error => res.status(404).json({errorMessage: 'User Not Found'}));
});

module.exports = router;
