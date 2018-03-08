import loginService from '../services/login'

const initState = {}

const reducer = (state = initState, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.user
  case 'LOGIN_USER':
    return action.user
  case 'LOGOUT_USER':
    window.localStorage.removeItem('currentUser')
    return { loggedIn: false }
  default:
    return state
  }
}

export default reducer

export const initUser = () => {
  let jsonUser = window.localStorage.getItem('currentUser')
  if (jsonUser) {
    jsonUser = JSON.parse(jsonUser)
    jsonUser = { ...jsonUser, loggedIn: true }
  }
  return ({
    type: 'INIT_USER',
    user: jsonUser || { loggedIn: false }
  })
}

export const logInUser = (username, password) => {
  return async dispatch => {
    const loginResponse = await loginService.login({ username, password })
    const user = {
      token: loginResponse.token,
      username: username,
      loggedIn: true,
    }
    window.localStorage.setItem('currentUser', JSON.stringify(user))
    dispatch({ type: 'LOGIN_USER', user })
  }
}

export const logOutUser = () => ({ type: 'LOGOUT_USER' })
