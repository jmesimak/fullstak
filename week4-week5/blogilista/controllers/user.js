const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

const SALT_ROUNDS = 10

usersRouter.get('/', async (request, response) => {
  const users = await User.find().populate('blogs')
  console.log(users)
  response.json(users.map(User.formatUser))
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name, adult } = request.body || {}
  const missing = ['username', 'password', 'name'].filter(f => !request.body[f])
  if (missing.length > 0) return response.status(400).json({ message: `Missing field: ${missing.join(', ')}` })

  if (password.length < 3)
    return response
      .status(400)
      .json({
        message: 'Password should be at least 3 characters'
      })

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  const newUser = new User({ username, password: hashedPassword, name, adult })
  try {
    await newUser.save()
    response.json({ name, username, _id: newUser._id, adult: newUser.adult })
  } catch (e) {
    return (e.message.includes('duplicate key') && e.message.includes('$username'))
      ? response.status(500).json({ message: `Username ${username} is already taken` })
      : response.status(500).json({ message: 'Could not create the user' })
  }
});

module.exports = usersRouter
