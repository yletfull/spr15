const path = require('path');

const cards = require(path.join(__dirname, '../models/cards'));

const getCards = (req, res) => {
  res.send(cards);
};

const addCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;
  cards.create({ name:name, link:link, owner:owner, likes:likes, createdAt:createdAt })
      .then(card => res.send({ card }))
      .catch(err => res.status(500).send({ message: `${err}` }));
      console.log(req.user._id)
}

module.exports = {
  getCards,
  addCard,
}