import { setNotificationKey } from './notifReducer'

const getId = () => (100000*Math.random()).toFixed(0)
export const dispatchWithNoficiation = (create, clear, message) => {
  // Dispatch the action straight away
  // Create notification with given message
  create(message)

  // Use unique id so that earlier timeouts don't clear later notifications
  const notifId = getId()
  setNotificationKey(notifId)
  setTimeout(() => clear(notifId), 5000)
}
