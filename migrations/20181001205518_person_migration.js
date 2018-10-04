
exports.up = knex =>
  knex.schema.createTable('person', function (table) {
    table.increments();
    table.string('name');
    table.dateTime('birthday');
    table.timestamps();
  })

exports.down = knex => knex.schema.dropTable('person')
