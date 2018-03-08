import axios from 'axios'

const initState = []

const reducer = (state = initState, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export default reducer

export const initUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users')
    dispatch({ type: 'INIT_USERS', users: response.data })
  }
}
