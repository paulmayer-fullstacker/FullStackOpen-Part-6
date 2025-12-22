// src/reducers/filterReducer.js
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    // Replaceing the 'SET_FILTER' case in our switch statement
    setFilter(state, action) {
      return action.payload
    }
  }
})

// createSlice automatically generates action creators with the same name as the reducers
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer