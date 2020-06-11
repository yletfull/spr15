const express = require('express');
// const http = require('http');
// const path = require('path');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const routes = require('./routes.js');

app.use(express.static(`${__dirname}/public`));
app.use('', routes);

const server = app.listen(PORT, () => {

});
// server.close();