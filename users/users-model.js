const db = require('../data/dbConfig.js');

const findAll = async => (
  db('users')
)

const findBy = filter => (
  db('users').where(filter)
)

const add = async user => (
  await db('users').insert(user, 'id')
    .then(ids => findBy({id: ids[0]}).first())
)

module.exports = {
  findAll, 
  findBy, 
  add
};
