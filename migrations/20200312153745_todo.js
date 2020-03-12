// id increment
// title varchar
// description varchar
// done_status boolean
// created_at date default now

exports.up = function(knex) {
  return knex.schema.createTable('todo', (table) => {
      table.increments();
      table.text('title').notNullable();
      table.text('description');
      table.boolean('done_status').defaultTo(false).notNullable();
      table.timestamp('created_at').defaultTo('now()');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
