const initialState = { message: 'Hullo hullo welcome hi yes' }

let notificationKey = ''

export default (store = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return { message: action.message }
  case 'CLEAR_NOTIFICATION':
    return notificationKey === action.key
      ? { message: '' }
      : store
  default:
    return store
  }
}

export const notifCreationAction = message => ({ type: 'CREATE_NOTIFICATION', message })
export const notifClearAction = key => ({ type: 'CLEAR_NOTIFICATION', key })
export const setNotificationKey = key => notificationKey = key
