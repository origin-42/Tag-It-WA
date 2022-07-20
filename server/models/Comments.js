const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'tags',
    required: true,
  },
  repliedUser: [ this ]
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
