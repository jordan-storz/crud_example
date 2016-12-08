const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/dishes', (req, res) => {
  knex('dish')
    .then((dishes) => {
      res.json(dishes);
    })
    .catch(err => handleErr(err, res));
});

app.get('/dishes/:id', (req, res) => {
  console.log(req.params);
  knex('dish')
    .where('id', req.params.id)
    .first()
    .then((dish) => {
      if (!dish) {
        return handleErr('No record found.', res);
      }
      res.json(dish);
    })
    .catch(err => handleErr(err, res));
});

app.post('/dishes', (req, res) => {
  let dish = req.body;
  knex('dish')
    .insert(dish)
    .returning(['id', 'name', 'price', 'rating'])
    .then((newDish) => {
      res.json({
        message: 'record created',
        dish: newDish[0]
      });
    })
    .catch(err => handleErr(err, res));
});

app.put('/dishes/:id', (req, res) => {
  let dishId = req.params.id;
  let dishInfo = req.body;
  knex('dish')
    .where('id', dishId)
    .update(dishInfo)
    .then((dish) => {
      res.json({
        message: 'Dish info updated!',
        dish: dish[0]
      });
    })
    .catch(err => handleErr(err, res));
});

app.delete('/dishes/:id', (req, res) => {
  knex('dish')
    .where('id', req.params.id)
    .del()
    .then((result) => {
      res.json({message: 'Dish deleted!'})
    })
    .catch(err => handleErr(err, res));
});

function handleErr(error, res) {
  res.status(500);
  res.json({
    message: 'Server error',
    error
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
