const path = require('path');

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

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  users.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: `${err}` }));
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
  users.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

module.exports = {
  getUsersList,
  getUser,
  addUser,
  updateUser,
  updateAvatar,
};
