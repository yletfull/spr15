/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const routes = require(path.join(__dirname, './routes/routes'));

const { PORT = 3000 } = process.env;
const app = express();
const { error, timeLog } = require(path.join(__dirname, '/routes/helpers.js'));

app.use(express.static(`${__dirname}/public`));
app.use('', timeLog);
app.use('', routes);
app.use('', error);

app.listen(PORT, () => {});
