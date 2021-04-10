const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gallery: [{type: mongoose.Schema.Types.ObjectId, ref: 'images'}]

});

module.exports = mongoose.model('users', usersSchema);
