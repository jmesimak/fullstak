let notificationSetter;

export default {
  setNotificationSetter: (setter) => notificationSetter = setter,
  setNotification: (message, type) => notificationSetter(message, type) 
}