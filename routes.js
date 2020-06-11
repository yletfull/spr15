const router = require('express').Router();
const { getUsers, timeLog } = require('./helpers.js');

router.get('/users/:id', timeLog);
router.get('/users/:id', getUsers);

module.exports = router;
