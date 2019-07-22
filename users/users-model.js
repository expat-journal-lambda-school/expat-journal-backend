const db = require('../data/dbConfig.js');
const Users = db('users')

const findAll = () => Users 

const findBy = filter => (
  Users.where(filter)
)

const add = async user => (
  await Users.insert(user, 'id')
    .then(ids => findBy({id: ids[0]}).first())
)

module.exports = {
  findAll, 
  findBy, 
  add
};
