const router = require('express').Router();
const path = require('path');

const users = require(path.join(__dirname, '../data/users'));

const getUsersList = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const currentUser = users.find((user) => user._id === req.params.id);
  if (!currentUser) { res.status(404).send({ message: 'Нет пользователя с таким id' }); return; }
  res.send((currentUser));
};

router.get('/users', getUsersList);
router.get('/users/:id', getUser);

module.exports = router;