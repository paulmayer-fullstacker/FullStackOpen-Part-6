// src/reducers/filterReducer.js

const filterReducer = (state = '', action) => {   // Initial state is empty string.
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload   // The state for the filter is text string input by the user. For the filter reducer: state is just the filter text string.
    default:
      return state            // Return the current (unchanged) state for any unhandled action.
  }
}

export const setFilter = (filterText) => {   // Action creator for setting the filter
  return {
    type: 'SET_FILTER',
    payload: filterText, // The content of the action is the filter text
  }
}

export default filterReducer