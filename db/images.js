const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

module.exports = mongoose.model('images', imageSchema);
