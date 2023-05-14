const router = require('express').Router();
const { validateLogin, validateCreateUser } = require('../middlewares/celebrate');
const { validateToken } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', validateToken, usersRouter);
router.use('/cards', validateToken, cardsRouter);
router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Page not found' });
});

module.exports = router;
