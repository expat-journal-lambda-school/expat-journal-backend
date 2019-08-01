const db = require('../data/dbConfig.js');

const findAll = async () => await db('users').select('id', 'username');

const findOneBy = async filter => await db('users').where(filter).first();

const remove = async id => db('users').where({id}).first().del();

const add = async user => {
  const [id] = await db('users').insert(user, 'id')
  return findOneBy({id})
};

const edit = async (id, user) => {
  await db('users').where({id}).update(user);
  return findOneBy({id})
};

module.exports = {
  findAll, 
  findOneBy, 
  remove,
  add,
  edit
};
