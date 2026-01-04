// src/NotificationContext.js
import { createContext, useContext, useRef } from 'react'

const notificationReducer = (state, action) => {  // Reducer manages how state transitions from one value to another based on actions.
  switch (action.type) {                          // action.type options: SET or CLEAR.
    case "SET": return action.payload            // Sets state to the message string.
    case "CLEAR": return null                   // Clears the message.
    default: return state                      // If no applicable case, return unchanged state.
  }
}

export const NotificationContext = createContext()

// Custom hooks
export const useNotificationValue = () => {    // Custom hook to extract just the current message value.
  const context = useContext(NotificationContext)  // Assign the 'value' currently held by the NotificationContext i.e., [notification, notificationDispatch].
  return context[0]                          // Returns 'notification'.
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)  // Again, assign the array [notification, notificationDispatch] to context.
  return context[1]     // Returns 'notificationDispatch'.  This function is used to send actions to the reducer, allowing components to trigger notifications without causing them to re-render every time the message text changes.
}

export const useNotify = () => {        // Logic-aware hook, handles the "Set message then auto-hide" flow.
  const dispatch = useNotificationDispatch()
  const timeoutRef = useRef(null)       // Creates a persistent reference that holds the ID of the active timer. Unlike a regular variable, this ID won't be lost when the component re-renders.
  return (message, seconds = 5) => {    // Refactored to remove duplication in setting notifications.
    if (timeoutRef.current) {           // If a timer is already running, clear it.
      clearTimeout(timeoutRef.current)  // "Kill" the existing timer so it doesn't fire and hide our new message prematurely.
    }
    dispatch({ type: 'SET', payload: message })   // Immediately update the state to show the new message.
    
    timeoutRef.current = setTimeout(() => {   // Store the new timer ID in the ref
      dispatch({ type: 'CLEAR' })     // New vote notifications will replace old/current ones. The lastnotification will display for 5 sec.
      timeoutRef.current = null      // Reset the ref back to null, once the timer has finished.
    }, seconds * 1000)              // Convert seconds to milliseconds for the browser API.
  }
}

// Export the reducer so we can use it in the provider file
export { notificationReducer }