// src/components/Notification.jsx
import { useNotificationValue } from '../NotificationContext'   // Import the custom hook that extracts the 'notification' string from Context

const Notification = () => {
  const notification = useNotificationValue()

  const style = {    // Define standard JavaScript object to handle the inline CSS styling
    border: 'solid',
    borderColor: 'blue',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null   // Conditional Rendering: If 'notification' is null (the initial state or after CLEAR is dispatched), the component returns 'null'. In this case nothing is rendered to the DOM (the blue box disappears).

  return (  // Display Rendering: If 'notification' contains a string, render the div with the defined styles. The notification inside the div {notification} is the payload sent by the dispatchers.
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
