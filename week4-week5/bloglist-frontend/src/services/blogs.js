import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const postNew = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: `Bearer ${token}` } } )
  return response.body
}

export const like = async (blog, token) => {
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, user: blog.user._id, likes: blog.likes + 1 },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.body
}

export const remove = async (blog, token) => {
  const response = await axios.delete(
    `${baseUrl}/${blog.id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.body
}

export default { getAll, postNew, like, remove }
