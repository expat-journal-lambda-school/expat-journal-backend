const db = require('../data/dbConfig.js');
const Posts = db('posts')

const findAll = () => Posts

const findBy = filter => (
  Posts.where(filter)
)

const add = async user => (
  await Posts.insert(user, 'id')
    .then(ids => findBy({id: ids[0]}).first())
)

module.exports = {
  findAll,
  findBy,
  add
}
