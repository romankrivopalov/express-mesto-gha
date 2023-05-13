const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  dafaultErrorMessage,
} = require('../utils/constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          const token = jwt.sign({ _id: user._id }, 'secret-person-key', { expiresIn: '7d' });
          res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });

          return res.status(200).send({ token });
        });
    })
    .catch(() => res.status(errCodeDefault).send({ message: 'Неправильные почта или пароль' }));
};

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(401).send({ message: dafaultErrorMessage }));
};

module.exports.getUserById = (req, res) => {
  let userId;

  if (req.params.id) {
    userId = req.params.id;
  } else {
    userId = req.user._id;
  }

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when get user' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errCodeNotFound)
          .send({ message: `User Id: ${userId} is not found` });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userSchema.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log(11);

        return;
      }

      if (err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when post user' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errCodeNotFound)
          .send({ message: `User Id: ${req.user._id} is not found` });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};
