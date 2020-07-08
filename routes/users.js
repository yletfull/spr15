const router = require('express').Router();
const path = require('path');

const {
  getUsersList, getUser, updateUser, updateAvatar,
} = require(path.join(__dirname, '../controllers/users'));

router.get('/users', getUsersList);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
