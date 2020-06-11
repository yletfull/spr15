const { users } = require('./users');

const timeLog = (req, res, next) => {
  const date = new Date();
  console.log(req.method);
  console.log(date);
  next();
};

const getUsers = (req, res) => {
  console.log(users[req.params.id]);
  if (!users[req.params.id]) { res.send({ error: 'Такого пользователя нет' }); return; }
  res.send(users[req.params.id]);
};

module.exports = {
  getUsers,
  timeLog,
};
