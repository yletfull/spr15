const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require(path.join(__dirname, '../models/users'));

const getUsersList = (req, res) => {
  users.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(404).send({ message: `Пользователя с id:'${req.params.id}' не существует` });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const register = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      users.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(200).send({ user }))
        .catch((err) => res.status(500).send({ message: `${err}` }));
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  users.findById(req.user._id)
    .then((user) => {
      if (user) {
        users.findByIdAndUpdate(req.user._id, { name, about },
          {
            new: true,
            runValidators: true,
            upsert: true,
          })
          .then((user) => res.status(200).send({ data: user }))
          .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
      } else {
        res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findById(req.user._id)
    .then((user) => {
      if (user) {
        users.findByIdAndUpdate(req.user._id, { avatar },
          {
            new: true,
            runValidators: true,
            upsert: true,
          })
          .then((user) => res.status(200).send({ data: user }))
          .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
      } else {
        res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const login = (req, res) => {
  const { email, password } = req.body;
  users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsersList,
  getUser,
  register,
  updateUser,
  updateAvatar,
  login,
};
