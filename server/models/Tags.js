const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comments = require('./Comments');

const tagsSchema = new Schema({
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
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
    ref: 'users'
  },
  comments: [Comments.schema],
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;
