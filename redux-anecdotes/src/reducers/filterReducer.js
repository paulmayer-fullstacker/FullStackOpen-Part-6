// src/reducers/filterReducer.js
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({   // createSlice: a function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types.
  name: 'filter',                  // Used as a prefix for the generated action types (e.g., 'filter/setFilter')
  initialState: '',               // The initial value of this slice of state is an empty string (meaning no filter is applied yet).
  reducers: {                    // The reducers object defines how the state should change in response to actions.
    setFilter(state, action) {  // setFilter is a reducer function that takes the current state and an action (as parameters).
      return action.payload    // The value passed to the action creator (e.g., 'IMPORTANT') is stored in action.payload. We return action.payload to make it the new value of the filter state.
    }
  }
})
// createSlice automatically generates action creators with the same name as the reducers
export const { setFilter } = filterSlice.actions   // Destructure 'setFilter' from filterSlice.actions and export it. That function, when called, returns a Redux action object { type: 'filter/setFilter', payload: ... }
export default filterSlice.reducer         // Export the reducer itself so it can be added to the main store configuration.