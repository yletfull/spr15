const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const auth = require(path.join(__dirname, './middlewares/auth'));
const { register, login } = require(path.join(__dirname, './controllers/users'));
const cards = require(path.join(__dirname, './routes/cards'));
const users = require(path.join(__dirname, './routes/users'));

const { error, timeLog, mongooseConnection } = require(path.join(__dirname, '/routes/helpers.js'));

mongooseConnection({ servUrl: 'mongodb://localhost:27017/mestodb' });

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use('', timeLog);
app.post('/signin', login);
app.post('/signup', register);
app.use('', auth);
app.use('', cards);
app.use('', users);
app.use('', error);

app.listen(PORT, () => {});
