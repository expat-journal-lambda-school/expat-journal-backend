const router = require('express').Router();

const Users = require('../users/users-model.js');
const Posts = require('./posts-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.post('/', restricted, (req, res) => {
  Posts.add(req.body)
    .then(post => res.status(201).json(post))
    .catch(error => res.status(500).json({...error, errorMessage: 'Not able to create new post'}))
})
//401... may have fixe?
//finally got 500 and getting all posts returned weird error
router.get('/', (req, res) => {
  Posts.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error))
})
//error after trying to post and failing, got post data in error
router.get('/:id', (req, res) => {
  Posts.findBy({id: req.params.id}).first()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error))
})

router.put('/:id', restricted, (req, res) => {
  Posts.findBy({id: req.params.id}).first()
    .then(post => {
      if(req.decodedToken.subject === post.user_id){
        Posts.update(post.id, req.body)
          .then(updatedPost => res.status(200).json(updatedPost))
          .catch(error => res.status(500).json(error))
      }
      else{
        throw new Error('this is not your post to edit')
      }
    })
    .catch(error => {
        res.status(403).json(error)
    })
})

router.delete('/:id', restricted, (req, res) => {
  Posts.findOneBy({id: req.params.id})
    .then(post => {
      if(req.decodedToken.subject === post.user_id){
        Posts.remove(post.id)
          .then(numOfDeleted => res.status(410).json({deleted: post}))
          .catch(error => res.status(500).json(error))
      }
      else{
        throw new Error('this is not your post to edit')
      }
    })
    .catch(error => {
        res.status(403).json(error)
    })
})

module.exports = router;
