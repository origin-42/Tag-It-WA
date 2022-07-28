const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tags',
    required: true,
  },
  repliedUser: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
