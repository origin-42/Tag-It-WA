const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comments = require('./Comments');

const tagsSchema = new Schema({
  address: {
    type: String
  },
  geolocation: {
    type: String
  },
  googleLocationID: {
    type: String
  },
  criteria: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  active: {
    type: Boolean,
    required: true
  },
  resolved: {
    type: Boolean,
    required: true
  },
  notifyUser: {
    type: Boolean,
    required: true
  },
  confirmed: {
    type: Number
  },
  denied: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  comments: [Comments.schema],
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;
