const cardSchema = require('../models/card');

const {
  NotFoundError,
  BadRequestError,
} = require('../utils/error');

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when post card'));
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema
    .findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new Error("You can't delete someone else's card"));
      }

      return cardSchema.findByIdAndRemove(cardId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid data when post card'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new BadRequestError(`Card Id: ${cardId} is not found`));
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new BadRequestError(`Card Id: ${req.params.cardId} is not found`));
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid data when like card'));
      }

      return next(err);
    });
};

module.exports.removeLikeCard = (req, res, next) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new BadRequestError(`Card Id: ${req.params.cardId} is not found`));
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when delete card like'));
      }

      return next(err);
    });
};
