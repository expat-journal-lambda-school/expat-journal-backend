const router = require('express').Router();

const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', restricted, async (req, res) => {
  Users.findOneBy({id: req.params.id})
    .then(user => {
      Posts.findBy({user_id: user.id})
        .then(posts => res.status(201).json({id: user.id, username: user.username, posts: posts}))
        .catch(error => res.status(500).json({...error, message: "Error finding posts"}))
    })
    .catch(error => res.status(500).json({...error, message: "Error finding user"}))
})

module.exports = router;
