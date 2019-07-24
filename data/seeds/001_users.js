require('dotenv').config();

const bcrypt = require('bcryptjs')
const faker = require('faker');

exports.seed = knex => (
  knex('users').del()
    .then(() => {
      const users = [];
      const numOfUsers = process.env.NUMOFUSERS || 25
      for(let i = 0; i < numOfUsers; i++){
        const password = faker.internet.password();
        const user = {
          id: i+1,
          username: faker.internet.userName(),
          password: bcrypt.hashSync(password, 10) 
        }
        console.log(`id: ${user.id}\nusername: ${user.username}\npassword: ${password}\n`)
        users.push(user)
      }

      return knex('users').insert(users)
    })
);
