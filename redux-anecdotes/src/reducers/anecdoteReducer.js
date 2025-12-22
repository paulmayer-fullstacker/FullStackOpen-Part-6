// src/reducers/anecdoteReducer.js:
import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [            // ... initial anecdote content strings
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)    // Helper for generating unique IDs.

const asObject = anecdote => {         // Helper to transform an anecdote string into an anecdote object (content, id, votes).
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)    // Create initial state array of anecdote objects.

const anecdoteSlice = createSlice({
  name: 'anecdotes',          // Key used in action types (e.g., 'anecdotes/voteForAnecdote').
  initialState,
  reducers: {
    createNewAnecdote(state, action) {
      // The  Immer library allows us use mutate state using .push() safely! A new state object is actually created maintaining immutability.
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    },
    voteForAnecdote(state, action) {
      const id = action.payload                   // We expect the ID to be passed as the payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1              // Mutation is safe here as we are employing createSlice from the Redux Tool Kit.
      }
      console.log(current(state))   // On vote log state to console. // 'current' is used to log the proxy state to a readable object
    }
  }
})

export const { createNewAnecdote, voteForAnecdote } = anecdoteSlice.actions   // Use destructuring to export the auto-generated action creators.
export default anecdoteSlice.reducer                    // Export reducer function
