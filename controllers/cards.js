const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.params);
  console.log(req.body);

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  cardSchema
    .findByIdAndRemove(id)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Card Id: ${id} is not found` });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id passed' });
        return;
      }

      res.status(500).send({ message: err.message });
    });
};
