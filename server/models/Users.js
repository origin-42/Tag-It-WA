const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Tags = require('./Tags');
const Comments = require('./Comments');

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tags: [Tags.schema],
    comments: [Comments.schema]
});

usersSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

usersSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
