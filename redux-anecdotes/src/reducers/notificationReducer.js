// src/reducers/notificationReducer.js:
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // 'This is the default notification message...', // The message to display by default
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer