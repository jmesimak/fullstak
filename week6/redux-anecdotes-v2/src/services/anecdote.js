import axios from 'axios'

const SERVER_URL = 'http://localhost:3001'

export default {
  getAll: () => axios.get(`${SERVER_URL}/anecdotes`),
  create: anecdote => axios.post(`${SERVER_URL}/anecdotes`, anecdote),
  update: anecdote => axios.put(`${SERVER_URL}/anecdotes/${anecdote.id}`, anecdote)
}