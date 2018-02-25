const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog');
const User = require('../models/user');


const userFormat = { username: 1, _id: 1 }

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', userFormat)
    response.json(blogs.map(Blog.formatBlog))
  } catch (e) {
    response.status(500).json({ message: 'Try again later' })
  }
})

blogsRouter.get('/:id', async ( request, response) => {
  try {
    const blog = await Blog.findById({ _id: request.params.id }).populate('user', userFormat)
    response.json(blog)
  } catch (e) {
    response.status(500).json({ message: 'Try again later' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body;
  if (!request.user) return response.status(403).json({ message: 'Missing authentication' })
  try {
    if (!title) return response.status(400).json({ message: 'Missing title' })
    if (!url) return response.status(400).json({ message: 'Missing url' })
    if (!author) return response.status(400).json({ message: 'Missing author' })
    const user = request.user

    if (!user) return response.status(400).json({ message: `No user found for id ${userId}` })
    const blogData = { title, author, url, user: user._id }
    const blog = await new Blog(blogData).save()

    await User.findOneAndUpdate({ _id: user._id }, { $push: { blogs: blog._id } })
    response.status(201).json(Blog.formatBlog(blog))
  } catch (e) {
    response.status(500).json({ message: 'Could not create blog post' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const toDelete = await Blog.findById(request.params.id)
    if (!request.user._id.equals(toDelete.user))
      return response.status(403).json({ message: 'User is not authorized to delete this entry' })
    await Blog.remove({ _id: request.params.id })
    response.status(204).end()
  } catch (e) {
    response.status(500).json({ message: 'Could not delete blog post' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(Blog.formatBlog(updatedBlog))
  } catch (e) {
    response.status(500).json({ message: 'Could not update blog post' })
  }
})

module.exports = blogsRouter;
