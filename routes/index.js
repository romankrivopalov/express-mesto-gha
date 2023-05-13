const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', validateToken, usersRouter);
router.use('/cards', validateToken, cardsRouter);
router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Page not found' });
});

module.exports = router;
