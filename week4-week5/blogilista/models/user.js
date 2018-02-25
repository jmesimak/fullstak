const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  adult: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.formatUser = user => ({
  id: user._id,
  name: user.name,
  username: user.username,
  adult: user.adult,
  blogs: user.blogs
})

const User = mongoose.model('User', userSchema);

module.exports = User;
