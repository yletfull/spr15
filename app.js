/* eslint-disable eol-last */
const express = require('express');

// eslint-disable-next-line no-unused-vars
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const routes = require('./routes/routes');
const { err, timeLog } = require('./routes/helpers');

app.use(express.static(`${__dirname}/public`));
app.use('', timeLog);
app.use('', routes);
app.use('', err);

// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {});
// server.close();