/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require(path.join(__dirname, '../models/users'));

const getUsersList = (req, res, next) => {
  users.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      err.statusCode = 500;
      next(err);
      // res.status(500).send({ message: err.message }));
    });
};

const getUser = (req, res, next) => {
  users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      } else {
        err = new Error(`Пользователя с id:'${req.params.id}' не существует`);
        err.statusCode = 404;
        next(err);
        // res.status(404).send({ message: `Пользователя с id:'${req.params.id}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err = new Error('Некорректный id');
        err.statusCode = 400;
        next(err);
        // return res.status(400).send({ message: 'Некорректный id' });
      }
      err.statusCode = 500;
      next(err);
      // res.status(500).send({ message: err.message });
    });
};
const register = (req, res, next) => {
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
          if (err.name === 'ValidationError') {
            err.statusCode = 400;
            next(err);
            // return res.status(400).send({ message: `${err}` });
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            err = new Error('Email уже используется');
            err.statusCode = 409;
            next(err);
            // return res.status(409).send({ message: 'Email уже используется' });
          }
          err.statusCode = 500;
          next(err);
          // res.status(500).send({ message: `${err}` });
        });
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
      //  res.status(400).send({ message: err.message });
    });
};

const updateUser = (req, res, next) => {
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
              err.statusCode = 400;
              next(err);
              // return res.status(400).send({ message: err.message });
            }
            err.statusCode = 500;
            next(err);
            // res.status(500).send({ message: err.message });
          });
      } else {
        err = new Error(`Пользователя с id:'${req.user._id}' не существует`);
        err.statusCode = 404;
        next(err);
        // res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err = new Error('Некорректный id');
        err.statusCode = 400;
        next(err);
        // return res.status(400).send({ message: 'Некорректный id' });
      }
      err.statusCode = 500;
      next(err);
      // res.status(500).send({ message: err.message });
    });
};

const updateAvatar = (req, res, next) => {
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
              err.statusCode = 400;
              next(err);
              // return res.status(400).send({ message: err.message });
            }
            err.statusCode = 500;
            next(err);
            // res.status(500).send({ message: err.message });
          });
      } else {
        err = new Error(`Пользователя с id:'${req.user._id}' не существует`);
        err.statusCode = 404;
        next(err);
        // res.status(404).send({ message: `Пользователя с id:'${req.user._id}' не существует` });
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
      // res.status(500).send({ message: err.message }));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
      // res.status(401).send({ message: err.message });
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
