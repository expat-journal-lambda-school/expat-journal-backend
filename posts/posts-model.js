const db = require('../data/dbConfig.js');
const Posts = db('posts')

const findAll = async () => await Posts

const findBy = async filter => (
  await Posts.where(filter)
)

const add = post => (
  Posts.insert(post, 'id')
    .then(ids => findBy({id: ids[0]}).first())
)

const update = (id, post) => (
  Posts.where({id}).first().update(post, 'id')
    .then(ids => findBy({id: ids[0]}))
)

const remove = id => (
  Posts.where({id}).del()
)

module.exports = {
  findAll,
  findBy,
  add,
  update,
  remove
}
