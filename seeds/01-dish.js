
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dish').del()
    .then(function () {
      return Promise.all([
        knex('dish').insert({
          name: 'Crunchwrap Supreme',
          price: 6,
          rating: 5
        }),
        knex('dish').insert({
          name: 'Tostada',
          price: 3,
          rating: 4
        }),
        knex('dish').insert({
          name: 'Steak Tacos',
          price: 7,
          rating: 5
        }),
        knex('dish').insert({
          name: 'Rice',
          price: 3,
          rating: 3
        })
      ]);
    });
};
