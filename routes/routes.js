/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const { getUser, getUsersList, getCards } = require(path.join(__dirname, './helpers'));

router.get('/users', getUsersList);

router.get('/users/:id', getUser);

router.get('/cards', getCards);

module.exports = router;
