const initialState = { message: '', notifType: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return { message: action.message, notifType: action.notifType }
  case 'CLEAR_NOTIFICATION':
    return { message: '', notifType: '' }
  default:
    return state
  }
}

export default reducer

export const createNotification = (message, notifType) => ({
  type: 'CREATE_NOTIFICATION',
  message,
  notifType,
})

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})