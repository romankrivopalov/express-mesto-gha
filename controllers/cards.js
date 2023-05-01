const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Invalid data when post card' });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  cardSchema
    .findByIdAndRemove(id)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Invalid card id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: `Card Id: ${id} is not found` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: `Card Id: ${req.user._id} is not found` });

        return;
      }

      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Invalid data when like card' });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.removeLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: `Card Id: ${req.user._id} is not found` });
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Invalid data when delete card like' });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};
