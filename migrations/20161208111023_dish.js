
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dish', (dish) => {
    dish.increments();
    dish.string('name');
    dish.integer('price');
    dish.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dish');
};
