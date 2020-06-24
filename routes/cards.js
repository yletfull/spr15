/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const {getCards, addCard} = require(path.join(__dirname, '../controllers/cards'))

router.get('/cards', getCards);
router.post('/cards', addCard)

module.exports = router;

