const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlPattern),
  }),
});

const validateDeleteCard = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateLikeCard = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateRemoveLikeCard = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateRemoveLikeCard,
};
