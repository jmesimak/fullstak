const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

let server;

morgan.token('body', req => JSON.stringify(req.body));
app.use(cors())
app.use(bodyParser.json());
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));
app.use(express.static('front'));

app.use(async (request, response, next) => {
  try {
    const token = request.get('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decoded.id)
    if (user) request.user = user
  } catch (e) {
    // Do nothing, no authenticated user, let routes do whatever with this information
  }
  next()
})

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}!`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = { app, server }
