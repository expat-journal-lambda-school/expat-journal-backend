exports.up = knex => (
  knex.schema
    .createTable('posts', table => {
      table.increments();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.string('title', 256)
        .notNullable();
      table.string('city', 128);
      table.string('country', 128);
      table.text('description')
        .notNullable();
      table.string('imageURL');
      table.timestamps(true, true);
    })
);

exports.down = knex => (
  knex.schema
    .dropTableIfExists('posts')
);
