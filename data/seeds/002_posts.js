require('dotenv').config();
const faker = require('faker');

const db = require('../dbConfig.js');

exports.seed = knex => (
  knex('posts').del()
    .then(deletedRows => (
      db('users').select('id')
        .then(userIds => {
          const posts = [];

          const numOfPosts = process.env.NUMOFPOSTS || 100
          for(i = 0; i < numOfPosts; i++){
            const post = {}
            post.user_id = userIds[Math.floor(Math.random() * (userIds.length-1) + 1)]['id'];
            post.title = faker.lorem.sentence();
            post.city = faker.address.city();
            post.country = faker.address.country();
            post.description = faker.lorem.paragraph();
            post.imageURL = `https://picsum.photos/id/${Math.floor(Math.random() * 2000 + 1)}/300/300`;

            posts.push(post)
          }
          return knex('posts').insert(posts);
        })
    ))
);
