/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const path = require('path');

const users = require(path.join(__dirname, '../data/users'));
const cards = require(path.join(__dirname, '../data/cards'));
const getUsersList = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const currentUser = users.find((user) => user._id === req.params.id);
  if (!currentUser) { res.status(404).send({ message: 'Нет пользователя с таким id' }); return; }
  res.send((currentUser));
};

const getCards = (req, res) => {
  res.send(cards);
};

const error = (req, res, err) => {
  if (err) { res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }); }
};

const timeLog = (req, res, next) => {
  const date = new Date();
  console.log(`${date}, URL:${req.url}, Method:${req.method}`);
  next();
};

module.exports = {
  getUsersList,
  getUser,
  getCards,
  error,
  timeLog,
};
