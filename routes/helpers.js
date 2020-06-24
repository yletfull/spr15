/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const path = require('path');

const error = (req, res, err) => {
  if (err) { res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }); }
};

const timeLog = (req, res, next) => {
  const date = new Date();
  console.log(`${date}, URL:${req.url}, Method:${req.method}`);
  next();
};

const mongooseConnection = (data) => {
  const {servUrl} = data;
  const mongoose = require('mongoose');
  mongoose.connect( servUrl , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
mongoose.connection.on("connected", function(ref) {
  console.log(`Succesfully connected to MongoDB Database "${servUrl}"`);
});
mongoose.connection.on("error", function(err) {
  console.error(`Database "${servUrl}" Connection error: ${err}`);
  if (err) {
      return next(err);
  }
});
};

module.exports = {
  mongooseConnection,
  error,
  timeLog,
};
