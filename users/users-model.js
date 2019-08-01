const db = require('../data/dbConfig.js');

const findAll = () => db('users').select('id', 'username');

const findOneBy = async filter => await db('users').where(filter).first();

const findBy = filter => db('users').where(filter);

const add = async user => await db('users').insert(user, ['id']);

const update = async (id, user) => {
  await findOneBy({id}).update(user);
  return findOneBy({id})
};

const remove = async (id) => {
  const deleted = findOneBy({id})
  findOneBy({id}).del()
  return deleted
};

module.exports = {
  findAll, 
  findBy, 
  findOneBy, 
  update,
  remove,
  add
};
