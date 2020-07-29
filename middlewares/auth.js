/* eslint-disable no-ex-assign */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    err = new Error('Необходима авторизация');
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    err = new Error('Необходима авторизация');
    err.statusCode = 401;
    return next(err);
  }

  req.user = payload;

  next();
};
