const db = require('../data/dbConfig.js');
const Posts = db('posts')

const findAll = () => Posts

const findBy = async filter => await Posts.where(filter)

const findOneBy = async filter => await Posts.where(filter).first()

const remove = async id => await db('posts').where({id}).del()

const add = async post => {
  const [id] = await Posts.insert(post, 'id')
  return await db('posts').where({id}).first()
}

const update = async (id, post) => {
  await findOneBy({id}).update(post)
  return findOneBy({id}) 
}


module.exports = {
  findAll,
  findBy,
  findOneBy,
  add,
  update,
  remove
}
