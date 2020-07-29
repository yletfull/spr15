/* eslint-disable no-console */

const errorProcessor = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  if (!err) { next(); }
};

const resourseError = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

const timeLog = (req, res, next) => {
  const date = new Date();
  console.log(`${date}, URL:${req.url}, Method:${req.method}`);
  next();
};

module.exports = {
  resourseError,
  timeLog,
  errorProcessor,
};
