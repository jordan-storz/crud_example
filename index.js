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
    });
});

app.get('/dishes/:id', (req, res) => {
  knex('dish')
    .where('id', req.params.id)
    .first()
    .then((dish) => {
      res.json(dish);
    });
});

app.post('/dishes', (req, res) => {
  let dish = req.body;
  knex('dish')
    .insert(dish)
    .then((result) => {
      console.log(result);
      res.json({message: 'record created'});
    })
    .catch(err => handleErr(err, res));
});

app.put('/dishes', (req, res) => {
  let dishId = req.body.id;
  let dishInfo = req.body.info;
  knex('dish')
    .where('id', dishId)
    .update(dishInfo)
    .then((result) => {
      console.log(result);
      res.json({message: 'Dish info updated!'});
    })
    .catch(err => handleErr(err, res));
});

app.delete('/dishes/:id', (req, res) => {
  knex('dish')
    .where('id', req.params.id)
    .del()
    .then((result) => {
      console.log(result);
      res.json({message: 'Dish deleted!'})
    })
    .catch(err => handleErr(err, res));
});

function handleErr(err, res) {
  res.status(500);
  res.json({
    message: 'Server error',
    error: err
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
