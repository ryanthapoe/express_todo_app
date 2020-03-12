
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {title: "Making Route", description: 'Creating todo rest route'},
        {title: "Creating View", description: 'Creating view for todo and form'},
        {title: "Push to Github", description: 'Push project to github'},
      ]);
    });
};
