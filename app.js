const path = require('path');
const express = require('express');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const cards = require(path.join(__dirname, './routes/cards'));
const users = require(path.join(__dirname, './routes/users'));

const { error, timeLog, mongooseConnection } = require(path.join(__dirname, '/routes/helpers.js'));

mongooseConnection({ servUrl: 'mongodb://localhost:27017/mestodb' });

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5ef60b7c9215cb244c174f2d',
  };
  next();
});
app.use('', timeLog);
app.use('', cards);
app.use('', users);
app.use('', error);

app.listen(PORT, () => {});
