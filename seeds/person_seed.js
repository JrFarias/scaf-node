
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {id: 1, name: 'name', birthdate: new Date(), created_at: new Date() },
        {id: 2, name: 'name2', birthdate: new Date(), created_at: new Date() }
      ]);
    });
};
