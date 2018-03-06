import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteFormReducer from './reducers/anecdoteFormReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notif: notifReducer,
  filter: filterReducer,
  newAnecdoteContent: anecdoteFormReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
