// src/components/Notification.jsx:
import { useSelector } from 'react-redux'

const Notification = () => {
  // Access the default notification message, set in the notificationReducer
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  // If there is no notification message, don't render the box at all
  if (!notification) return null

  return (
  <div style={style}>
    {notification} {/* Render the value of the notification attribute extracted from store state. */}
  </div>
  )
}

export default Notification
