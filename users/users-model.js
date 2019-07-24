const db = require('../data/dbConfig.js');
const Users = db('users')

const findAll = async () => await Users 

const findOneBy = async filter => (
  await Users.where(filter).first()
)
const findBy = async filter => (
  await Users.where(filter)
)

const add = async user => (
  await Users.insert(user, 'id')
    .then(ids => {
      return findBy({id: ids[0]})
    })
)

module.exports = {
  findAll, 
  findBy, 
  findOneBy, 
  add
};
