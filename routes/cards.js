const cardRouter = require('express').Router();
const { getCards, postCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);

module.exports = cardRouter;
