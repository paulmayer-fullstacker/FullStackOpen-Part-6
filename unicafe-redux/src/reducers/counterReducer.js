// src/reducers/counterReducer.js
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {
        ...state, // Unpack and copy existing properties (good, ok, bad).
          good: state.good + 1 // Update the 'good' property.
      }
    case 'OK':
      return {
        ...state,
          ok: state.ok + 1
      }
    case 'BAD':
      return {
        ...state,
          bad: state.bad + 1
      }
    case 'RESET':
      return initialState  // Return the original initialState object, setting all counts to 0.
    default:
      return state   // A reducer must always return the current state for unhandled actions.
  }
}

export default counterReducer
