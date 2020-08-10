/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const path = require('path');

const cards = require(path.join(__dirname, '../models/cards'));

const { NotFoundError } = require(path.join(__dirname, '../errors/NotFoundError'));
const { NoAccess } = require(path.join(__dirname, '../errors/NoAccess'));
const { BadRequest } = require(path.join(__dirname, '../errors/BadRequest'));

const getCards = (req, res, next) => {
  cards.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

const addCard = (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;
  cards.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        return next(err);
      }
      err.statusCode = 500;
      next(err);
    });
};

const removeCard = (req, res, next) => {
  cards.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        // eslint-disable-next-line eqeqeq
        if (card.owner == req.user._id) {
          cards.findByIdAndRemove(req.params.cardId)
            .then(res.status(200).send({ card }))
            .catch((err) => {
              err.statusCode = 500;
              next(err);
            });
        } else {
          err = new NoAccess('Нет доступа');
          next(err);
        }
      } else {
        err = new NotFoundError(`Карточки с id:'${req.params.cardId}' не существует`);
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректный id'));
      }
      err.statusCode = 500;
      next(err);
    });
};

const likeCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        err = new NotFoundError(`Карточки с id:'${req.params.cardId}' не существует`);
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректный id'));
      }
      err.statusCode = 500;
      next(err);
    });
};

const dislikedCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        err = new NotFoundError(`Карточки с id:'${req.params.cardId}' не существует`);
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректный id'));
      }
      err.statusCode = 500;
      next(err);
    });
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  likeCard,
  dislikedCard,
};
