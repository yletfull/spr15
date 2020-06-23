/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const cards = require(path.join(__dirname, '../data/cards'));

const getCards = (req, res) => {
  res.send(cards);
};

router.get('/cards', getCards);

module.exports = router;

