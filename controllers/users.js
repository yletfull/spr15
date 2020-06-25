const path = require('path');

const users = require(path.join(__dirname, '../models/users'));

const getUsersList = (req, res) => {
  users.find({})
        .then(users => res.send({users}))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  users.findById(req.params.id)
        .then(user => res.send({user}))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  users.create({ name:name, about:about, avatar:avatar })
      .then(user => res.send({ user }))
      .catch(err => res.status(500).send({ message: `${err}` }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(req.user._id, { name:name, about:about },
  {
    new: true,
    runValidators: true,
    upsert: true
  })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: `${err}` }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findByIdAndUpdate(req.user._id, { avatar:avatar },
  {
    new: true,
    runValidators: true,
    upsert: true
  })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: `${err}` }));
};


module.exports = {
  getUsersList,
  getUser,
  addUser,
  updateUser,
  updateAvatar,
}