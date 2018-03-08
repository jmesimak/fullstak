
import blogService from '../services/blogs'

const initState = []
const reducer = (state = initState, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.id ? { ...blog, likes: blog.likes + 1 } : blog)
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id === action.id ? { ...blog, comments: blog.comments.concat(action.comment) } : blog )
  case 'CREATE_BLOG':
    return state.concat(action.blog)
  default:
    return state
  }
}

export default reducer

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', blogs })
  }
}

export const likeBlog = (blog, token) => {
  return async dispatch => {
    await blogService.like(blog, token)
    dispatch({ type: 'LIKE_BLOG', id: blog.id })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    await blogService.comment(blog, comment)
    dispatch({ type: 'COMMENT_BLOG', id: blog.id, comment })
  }
}

export const postBlog = (blog, token) => {
  return async dispatch => {
    const response = await blogService.postNew(blog, token)
    dispatch({ type: 'CREATE_BLOG', blog: response })
  }
}
