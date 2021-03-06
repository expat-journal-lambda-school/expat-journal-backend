exports.up = knex => (
  knex.schema
    .createTable('users', users => {
      users.increments();
      users.string('username', 128)
        .notNullable()
        .unique();
      users.string('password')
        .notNullable();
      users.timestamps(true, true);
    })
);

exports.down = knex => ( 
   knex.schema.dropTableIfExists('users') 
);
