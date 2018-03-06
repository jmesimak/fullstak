const initState = ''
const reducer = (state = initState, action) => {
  switch (action.type) {
  case 'UPDATE_CONTENT':
    return action.content
  default:
    return state
  }
}

export default reducer

export const handleNewAnecdoteChange = content => ({
  type: 'UPDATE_CONTENT',
  content,
})
