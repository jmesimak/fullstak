const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')

describe('/api/login', async () => {
  beforeAll(async () => {
    await api.post('/api/users').send({ username: 'jerry', password: 'hash', name: 'Jerry' })
  });

  test('gives the correct error when user does not exist', async() => {
    const response = await api
      .post('/api/login')
      .send({ username: 'foo', password: 'ook' });

    expect(response.body.message).toBe('User does not exist!');
  });

  test('gives the correct error with wrong password', async() => {
    const response = await api
      .post('/api/login')
      .send({ username: 'jerry', password: 'ook' });

    expect(response.body.message).toBe('Wrong password');
  });

  test('returns a token with valid query', async() => {
    const response = await api
      .post('/api/login')
      .send({ username: 'jerry', password: 'hash' });

    expect(response.body.token).toBeTruthy();
  });

  afterAll(async () => {
    await User.remove()
    server.close()
  });
})