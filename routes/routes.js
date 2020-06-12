const router = require('express').Router();
const { getUser, getUsersList, getCards } = require('./helpers.js');

router.get('/users', getUsersList);

router.get('/users/:id', getUser);

router.get('/cards', getCards);

module.exports = router;
