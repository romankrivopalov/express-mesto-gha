const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req);

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
