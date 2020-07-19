const router = require('express').Router();
const path = require('path');

const {
  getCards, addCard, removeCard, likeCard, dislikedCard,
} = require(path.join(__dirname, '../controllers/cards'));

router.get('/cards', getCards);
router.post('/cards', addCard);
router.delete('/cards/:cardId', removeCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikedCard);

module.exports = router;
