const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body || {}
  if (!username || !password) return response.status(400).json({ message: 'Missing fields: username, password' })
  const user = await User.findOne({ username })
  if (!user) return response.status(401).json({ message: 'User does not exist!' })

  const success = await bcrypt.compare(password, user.password)
  if (!success) return response.status(401).json({ message: 'Wrong password' })

  const tokenUser = { username, id: user._id }
  const token = jwt.sign(tokenUser, process.env.SECRET)
  response.status(200).json({token})
})

module.exports = loginRouter
