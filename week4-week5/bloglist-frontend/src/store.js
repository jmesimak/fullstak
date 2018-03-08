import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import usersReducer from './reducers/users'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'

const reducer = combineReducers({
  notification: notificationReducer,
  users: usersReducer,
  blogs: blogsReducer,
  user: userReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store
