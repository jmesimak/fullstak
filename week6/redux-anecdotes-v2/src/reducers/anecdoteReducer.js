import anecdoteService from '../services/anecdote'

/* eslint-disable no-case-declarations */
const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]

  case 'CREATE_ANECDOTE':
    return [...store, action.anecdote]

  case 'FILTER_ANECDOTE':
    return store.map(anecdote => ({ ...anecdote, visible: anecdote.content.includes(action.keyword) }))

  case 'INIT_ANECDOTE':
    return action.data

  default:
    return store
  }
}

export const anecdoteCreationAction = content => async dispatch => {
  const anecdote = (await anecdoteService.create({ content, votes: 0 })).data
  dispatch({
    type: 'CREATE_ANECDOTE',
    anecdote,
  })
}

export const anecdoteFilterAction = keyword => ({
  type: 'FILTER_ANECDOTE',
  keyword,
})

export const anecdoteInitAction = () => async dispatch => {
  const data = (await anecdoteService.getAll()).data
  dispatch({
    type: 'INIT_ANECDOTE',
    data,
  })
}

export const anecdoteLikeAction = anecdote => async dispatch => {
  await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch({ type: 'VOTE', id: anecdote.id })
}

export default reducer