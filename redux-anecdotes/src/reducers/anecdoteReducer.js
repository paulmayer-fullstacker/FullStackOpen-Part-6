// src/reducers/anecdoteReducer.js:
import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',          // Key used in action types (e.g., 'anecdotes/voteForAnecdote').
  initialState: [],
  reducers: {
    createNewAnecdote(state, action) {   // Reducer to add a single anecdote object to the state array
      // The  Immer library allows us use mutate state using .push() safely! A new state object is actually created maintaining immutability.
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {   // Reducer to update the vote count of a specific anecdote in the state
      const id = action.payload                   // We expect the ID to be passed as the payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1    // Apparent Mutation.  Immer allows this 'mutation style' logic, while maintaining immutability under the hood.
      }
      console.log(current(state))    // On vote, log state to console. // 'current' is used to log the proxy state to a readable object
    },
    setAnecdotes(state, action) {   // Reducer to replace the entire anecdotes array (used during initial load)
      return action.payload
    }
  }
})

export const { createNewAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions   // Use destructuring to export the auto-generated action creators.

// Asynchronout Thunks

export const initializeAnecdotes = () => {   // Initialise the store from the backend. It fetches all anecdotes from server and updates the store.
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {    // Handle the server communication and the state update.
  return async dispatch => {                    // Save new anecdote to server, then updates the local store with the response
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(createNewAnecdote(newAnecdote))    // Call our createNewAnecdote reducer here to update the UI.
  }
}

export const updateVoteOnServer = (anecdote) => {  // Updates the server first, then syncs the local store using the ID
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote)   // Incremet the vote count for the specified anecdote, on the server.
    
    dispatch(voteForAnecdote(updatedAnecdote.id))                     // Update the Redux store using the ID returned from the server.
  }
}

export default anecdoteSlice.reducer          // Export reducer function.
