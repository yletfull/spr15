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
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(400).send({ message: `${err}` }); }
      res.status(500).send({ message: `${err}` });
    });
};

const removeCard = (req, res) => {
  cards.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        // eslint-disable-next-line eqeqeq
        if (card.owner == req.user._id) {
          cards.findByIdAndRemove(req.params.cardId)
            .then(res.status(200).send({ card }))
            .catch((err) => res.status(500).send({ message: err.message }));
        } else {
          res.status(403).send({ message: 'Нет доступа' });
        }
      } else {
        res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
      }
      res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
      }
      res.status(500).send({ message: err.message });
    });
};

const dislikedCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: `Карточки с id:'${req.params.cardId}' не существует` });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  likeCard,
  dislikedCard,
};
