const path = require('path');

const cards = require(path.join(__dirname, '../models/cards'));

const getCards = (req, res) => {
  cards.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

const addCard = (req, res) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;
  cards.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

const removeCard = (req, res) => {
  cards.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send({ card }))
    .catch(() => res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` }));
};

const likeCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: `Liked ${req.params.cardId}` }))
    .catch(() => res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` }));
};

const dislikedCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(200).send({ message: `Disliked ${req.params.cardId}` }))
    .catch(() => res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` }));
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  likeCard,
  dislikedCard,
};
