const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require(path.join(__dirname, '../models/users'));

const getUsersList = (req, res) => {
  users.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
      }
      res.status(500).send({ message: err.message });
    });
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
        .then(() => res.status(200).send({
          name, about, avatar, email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') { res.status(400).send({ message: `${err}` }); }
          // eslint-disable-next-line eqeqeq
          if (err.name === 'MongoError' && err.code == '11000') { res.status(409).send({ message: 'Email уже используется' }); }
          res.status(500).send({ message: `${err}` });
        });
    })
    .catch((err) => { res.status(400).send({ message: err.message }); });
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
          .catch((err) => {
            if (err.name === 'ValidationError') {
              res.status(400).send({ message: err.message });
            }
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
      }
      res.status(500).send({ message: err.message });
    });
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
          .catch((err) => {
            if (err.name === 'ValidationError') {
              res.status(400).send({ message: err.message });
            }
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
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
