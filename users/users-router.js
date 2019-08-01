const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', restricted, (req, res) => {
  Users.findOneBy({id: req.params.id})
    .then(user => {
      Posts.findBy({user_id: user.id})
        .then(posts => res.status(201).json({id: user.id, username: user.username, posts}))
        .catch(error => res.status(500).json({...error, message: "Error finding posts"}))
    })
    .catch(error => res.status(500).json({...error, message: "Error finding user"}))
})

router.put('/:id', restricted, (req, res) => {
  if(req.decodedToken.subject === Number(req.params.id)){
    const userUpdates = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10) 
    };
    Users.edit(req.params.id, userUpdates)
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(error => res.status(500).json(error))
    }
  else{
   res.status(500).json({errorMessage: 'This is not you'})
  }
})

  /*
router.delete('/:id', restricted, (req, res) => {
  if(req.decodedToken.subject === req.params.id){
    const updates = {username: req.body.username, password: req.body.password};
    Users.remove(req.params.id, updates)
      .then(deletedUser => res.status(200).json(updatedUser))
      .catch(error => res.status(500).json(error))
    }
  else{
   res.status(500).json({errorMessage: 'This is not you'})
  }
})
*/
module.exports = router;
