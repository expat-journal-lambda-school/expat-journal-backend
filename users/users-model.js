const db = require('../data/dbConfig.js');
const Users = db('users');

const findAll = () => Users.select('id', 'username');

const findOneBy = async filter => await db('users').where(filter).first();

const findBy = filter => Users.where(filter);

const add = async user => await Users.insert(user, ['id']);


module.exports = {
  findAll, 
  findBy, 
  findOneBy, 
  add
};
