const mongoose = require('mongoose')

const User = require('./user')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.formatBlog = blog => ({
  id: blog._id,
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
  user: blog.user,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
