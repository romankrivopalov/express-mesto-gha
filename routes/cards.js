const cardRouter = require('express').Router();
const { getCards, postCard, deleteCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:id', deleteCard);

module.exports = cardRouter;
