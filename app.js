const path = require('path');
const express = require('express');

const cards = require(path.join(__dirname, './routes/cards'));
const users = require(path.join(__dirname, './routes/users'));

const { error, timeLog, mongooseConnection } = require(path.join(__dirname, '/routes/helpers.js'));

mongooseConnection({ servUrl: 'mongodb://localhost:27017/mestodb' });

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5ef3a166226b012698a08afd',
  };
  next();
});
app.use('', timeLog);
app.use('', cards);
app.use('', users);
app.use('', error);

app.listen(PORT, () => {});
