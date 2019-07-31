const db = require('../data/dbConfig.js');

const findAll = () => db('posts')

const findBy = async filter => (
  await db('posts').where(filter)
)

const add = async post => {
  const [id] = await db('posts').insert(post, 'id') 
  return await db('posts').where({id}).first()
}

const update = async (id, post) => {
  await db('posts').where({id}).first().update(post)

  return db('posts').where({id}).first()
}

const remove = id => {
  const deleted = db('posts').where({id}).first()
  
  db('posts').where({id}).del()
  
  return deleted
}

module.exports = {
  findAll,
  findBy,
  add,
  update,
  remove
}
