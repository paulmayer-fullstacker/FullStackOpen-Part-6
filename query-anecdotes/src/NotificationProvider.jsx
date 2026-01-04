// src/NotificationProvider.jsx

// Wrapper component that enables the context.

import { useReducer } from 'react'
import { NotificationContext, notificationReducer } from './NotificationContext'

// NotificationContextProvider is a component that wraps our entire app. It holds the "Live" state for notifications and shares it with all children.
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  /*
   * useReducer is called here to create the state and the dispatch function.
   * notification is the current state value (e.g., "anecdote created"). React monitors this; when it changes, the UI updates.
   * notificationDispatch is the messenger function. Used with an action, whenever we want to change the message.
   * notificationReducer is the external logic function we imported. It manages the logic that decides how the state changes based on the action.
   * null: This is the INITIAL state. When the app first loads, there is no notification, so we start with null.
   */

  return (   // Provide the [state, dispatch] array to the entire app tree
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}