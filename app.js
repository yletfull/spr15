/* eslint-disable import/no-dynamic-require */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const cards = require(path.join(__dirname, './routes/cards'));
const users = require(path.join(__dirname, './routes/users'))

const { PORT = 3000 } = process.env;
const app = express();
const { error, timeLog } = require(path.join(__dirname, '/routes/helpers.js'));

app.use(express.static(`${__dirname}/public`));
app.use('', timeLog);
app.use('', cards);
app.use('', users);
app.use('', error);

app.listen(PORT, () => {});
