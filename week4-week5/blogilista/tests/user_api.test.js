const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')

describe ('/api/users', async () => {
  describe('GET /api/users', async () => {
    beforeAll(async () => {
      await User.remove()
      const users = [
        { username: 'jerry', password: 'hash', name: 'Jerry' },
        { username: 'jjoonia', password: 'hash', name: 'Jerry' },
      ]
      await Promise.all(users.map(u => new User(u).save()))
    })

    test('Returns the initially saved list of users', async () => {
      const response = await api.get('/api/users')
      const initialUsernames = response.body.map(({ username }) => username)
      expect(initialUsernames).toEqual(['jerry', 'jjoonia'])
    })
  })

  describe('POST /api/users', async () => {
    test('Cannot add user with 2 character password', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'foo', name: 'bar', password: 'gg', adult: false })

      expect(response.body.message).toEqual('Password should be at least 3 characters')
    })

    test('When trying to add user already in the database, a good response message is given', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'jerry', name: 'bar', password: '1337', adult: false })

      expect(response.body.message).toEqual('Username jerry is already taken')
    })

    test('When a required field is missing, response states what it is', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'jerry2', password: '1337', adult: false })

      expect(response.body.message).toEqual('Missing field: name')
    })

    test('Adding a new user with correct data works like a charm', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'jerry2', name: 'Jerry', password: '1337' })

      expect(response.body).toEqual(expect.objectContaining({ name: 'Jerry', username: 'jerry2', adult: true }))
    })
  })

  afterAll(async () => {
    await User.remove()
    server.close()
  })
})