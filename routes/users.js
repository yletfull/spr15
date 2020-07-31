const router = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');

const {
  getUsersList, getUser, updateUser, updateAvatar,
} = require(path.join(__dirname, '../controllers/users'));

router.get('/users', getUsersList);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().min(24)
      .max(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
  }),
}), updateAvatar);

module.exports = router;
