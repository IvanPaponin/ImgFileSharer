const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  comments: [{
    commentText: String,
    author: String,
    authorId: String,
    postedAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
  }]
});

module.exports = mongoose.model('images', imageSchema);
