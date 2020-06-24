const router = require('express').Router();
const path = require('path');

const { getUsersList, getUser, addUser } = require(path.join(__dirname, '../controllers/users'));


router.get('/users', getUsersList);
router.get('/users/:id', getUser);
router.post('/users', addUser);

module.exports = router;