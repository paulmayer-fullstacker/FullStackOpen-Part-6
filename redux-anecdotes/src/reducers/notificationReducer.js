// src/reducers/notificationReducer.js:
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // The message to display by default is anempty string.
  reducers: {
    _setNotification(state, action) {   // _setNotification updates the text message in the state. 
      return action.payload
    },
    clearNotification() {         // Reset the notifiction message to an empty string.
      return ''
    }
  }
})

export const { _setNotification, clearNotification } = notificationSlice.actions   // Export the reducer action creators.

export const setNotification = (message, seconds) => {  // Thunk: public-facing function. It handle the logic to display and then hide the notification, in one call
  return async (dispatch) => {
    dispatch(_setNotification(message)) // Calling the "internal" reducer.

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer