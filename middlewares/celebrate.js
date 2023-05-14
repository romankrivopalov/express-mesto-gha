const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(urlPattern),
  }),
});

const validateUserAvatar = celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().required().regex(urlPattern),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlPattern),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateRemoveLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUserAvatar,
  validateUserId,
  validateUpdateUser,
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateRemoveLikeCard,
};
