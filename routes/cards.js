const router = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');

const {
  getCards, addCard, removeCard, likeCard, dislikedCard,
} = require(path.join(__dirname, '../controllers/cards'));

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
  }),
}), addCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().min(24)
      .max(24),
  }),
}), removeCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().min(24)
      .max(24),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().min(24)
      .max(24),
  }),
}), dislikedCard);

module.exports = router;
