const db = require('../data/dbConfig.js');

const findAll = async () => await db('posts') 

const findBy = async filter => await db('posts').where(filter)

const findOneBy = async filter => await db('posts').where(filter).first()

const remove = async id => await db('posts').where({id}).del()

const add = async post => {
  const [id] = await db('posts').insert(post, 'id')
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
