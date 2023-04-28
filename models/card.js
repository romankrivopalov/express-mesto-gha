const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: '',
  likes: {
    type: String,
    enum: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
