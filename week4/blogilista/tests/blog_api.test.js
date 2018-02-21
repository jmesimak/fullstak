const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const Blog = require('../models/blog')
const { initBlogs, getAllBlogs } = require('./test_helpers')

describe('/api/blogs', async () => {
  let token;

  beforeAll(async() => {
    await api.post('/api/users').send({ username: 'jerry', password: 'hash', name: 'Jerry' })
    const loginResponse = await api.post('/api/login').send({ username: 'jerry', password: 'hash' })
    token = loginResponse.body.token
  })

  describe('GET /api/blogs', async () => {
    let createdBlogs = [];
    beforeAll(async () => {
      createdBlogs = await initBlogs()
    })

    test('API returns the initially saved blogs', async () => {
      const response = await api
        .get('/api/blogs')
      expect(response.body.length).toBe(2)
    })

    test('Blog from Bar2 is within the blogs', async () => {
      const response = await api
        .get('/api/blogs')
      expect(response.body.map(({ author }) => author).includes('Bar2')).toBe(true)
    })

    test('Can fetch a single blog with id', async () => {
      const response = await api
        .get(`/api/blogs/${createdBlogs[0]._id}`)
      expect(response.body.author).toBe('Bar1');
    });

    afterAll(async () => {
      await Blog.remove({})
    })
  })

  describe('POST /api/blogs', async () => {
    test('API returns the created blog supplied with an id', async () => {
      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}`})
        .send({ title: 'Melmontis', author: 'Jerry', url: 'melmontis.com', likes: 1337 })

      expect(response.body.id).toBeDefined()
    })

    test('API sets likes to 0 if the field is not present in the request', async () => {
      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}`})
        .send({ title: 'Melmontis2', author: 'Jerry2', url: 'melmontis.com2' })

      expect(response.body.likes).toBe(0)
    })

    test('API does not accept blogs without a title and an author', async () => {
      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}`})
        .send({ url: 'melmontis.com2' })
        .expect(400)
    })

    afterAll(async () => {
      await Blog.remove({})
    })
  })

  describe('DELETE /api/blogs', async () => {
    let createdBlogId
    beforeAll(async () => {
      const response = await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}`})
        .send({ title: 'Melmontis', author: 'Jerry', url: 'melmontis.com', likes: 1337 })
      createdBlogId = response.body.id
    })

    test('API allows deletion of a created blog', async () => {
      const response = await api
        .delete(`/api/blogs/${createdBlogId}`)
        .set({ Authorization: `Bearer ${token}`})
        .expect(204)

      const blogs = await getAllBlogs()
      expect(blogs.length).toBe(0)
    })

    test('API returns 500 when trying to delete non-existent ID', async () => {
      const response = await api
        .delete('/api/blogs/badId')
        .set({ Authorization: `Bearer ${token}`})
        .expect(500)
    })

    afterAll(async () => {
      await Blog.remove({})
    })
  })

  describe('PUT /api/blogs', async () => {
    let createdBlogs = [];
    beforeAll(async () => {
      createdBlogs = await initBlogs()
    })

    test('API allows updating a blog that was previously created', async () => {
      const response = await api
        .put(`/api/blogs/${createdBlogs[0]._id}`)
        .send({ likes: 1337 })
        .expect(200)

      expect(response.body.likes).toBe(1337)
    })

    afterAll(async () => {
      await Blog.remove({})
    })
  })

  afterAll(() => {
    server.close()
  })
})
