const Blog = require('../models/blog')

const initBlogs = async (api, user) => {
  await Blog.remove({})
  const blogs = [
    new Blog({ title: 'Foo1', author: 'Bar1', url: 'Nope1', likes: 0 }),
    new Blog({ title: 'Foo2', author: 'Bar2', url: 'Nope2', likes: 1 })
  ]
  const blogSavePromises = blogs.map(blog => blog.save())
  return Promise.all(blogSavePromises)
};

const getAllBlogs = async () => Blog.find({})

module.exports = {
  initBlogs,  
  getAllBlogs,
}
