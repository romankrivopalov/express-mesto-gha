const jwt = require('jsonwebtoken');
const { UnathorizedError } = require('../utils/error');

// const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.validateToken = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new UnathorizedError('Authorization required'));
  // }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-person-key');
  } catch (err) {
    return next(new UnathorizedError('Authorization required'));
  }

  req.user = payload;

  return next();
};
