const router = require('express').Router();

const Users = require('../users/users-model.js');
const Posts = require('./posts-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
  Posts.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error))
})

router.post('/', restricted, (req, res) => {
  const newPost = {...req.body, user_id: req.decodedToken.subject}
  Posts.add(newPost)
    .then(posted => res.status(201).json(posted))
    .catch(error => res.status(500).json(error))
})

router.get('/:id', (req, res) => {
  Posts.findOneBy({id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error))
})

router.put('/:id', restricted, (req, res) => {
  Posts.findOneBy({id: req.params.id})
    .then(post => {
      if(req.decodedToken.subject === post.user_id){
        Posts.edit(req.params.id, req.body)
          .then(updatedPost => res.status(200).json(updatedPost))
          .catch(error => res.status(500).json({error_message:'error on updating'}))
      }
      else{
        res.status(403).json({error_message: 'this is not your post to update'})
      }
    })
    .catch(error => res.status(500).json({error_message: "error on find one by"}))
})

router.delete('/:id', restricted, (req, res) => {
  Posts.findOneBy({id: req.params.id})
    .then(post => {
      if(req.decodedToken.subject === post.user_id){
        Posts.remove(post.id)
          .then(numOfDeleted => res.status(210).json({deleted: post}))
          .catch(error => res.status(500).json({error_message: "error on remove"}))
      }
      else{
        res.status(403).json({error_message: 'this is not your post to delete'})
      }
    })
    .catch(error => res.status(500).json({error_message: "error on find one by"}))
})

module.exports = router;
