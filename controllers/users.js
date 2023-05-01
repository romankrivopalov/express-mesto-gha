const userSchema = require('../models/user');

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: `User Id: ${id} is not found` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Invalid data when post user' });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: `User Id: ${req.user._id} is not found` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: `User Id: ${req.user._id} is not found` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};
