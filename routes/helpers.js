/* eslint-disable no-console */
const mongoose = require('mongoose');

const error = (req, res, err) => {
  if (err) { res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }); }
};

const errorProcessor = (err, req, res, next) => {
  const {statusCode = 500, message} = err;
  res.status(statusCode).send({message: statusCode === 500 ? 'Ошибка сервера' : message})
}

const timeLog = (req, res, next) => {
  const date = new Date();
  console.log(`${date}, URL:${req.url}, Method:${req.method}`);
  next();
};

const mongooseConnection = (data) => {
  const { servUrl } = data;
  mongoose.connect(servUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('connected', () => {
    console.log(`Succesfully connected to MongoDB Database "${servUrl}"`);
  });
  mongoose.connection.on('error', (err) => {
    console.error(`Database "${servUrl}" Connection error: ${err}`);
  });
};

module.exports = {
  mongooseConnection,
  error,
  timeLog,
  errorProcessor,
};
