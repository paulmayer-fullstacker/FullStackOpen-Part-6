// src/reducers/anecdoteReducer.js:
const anecdotesAtStart = [            // ... initial anecdote content strings
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)    // Helper for generating unique IDs

const asObject = anecdote => {         // Helper to transform an anecdote string into an anecdote object (content, id, votes).
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)    // Create initial state array of anecdote objects

export const voteForAnecdote = (id) => {  // Action Creator for anecdote voting. Returns an action object to vote for an anecdote.
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const createNewAnecdote = (content) => {  // Action Creator for creating anecdotes. It takes the content and returns the complete action object.
    return {
        type: 'CREATE',
        data: {
            content: content,
            id: getId(),
            votes: 0
        }
    }
}

const anecdoteReducer = (state = initialState, action) => {  // The reducer function: takes current state and action, returns new state.
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {  // Handle the VOTE action.
      const id = action.data.id  // Identify the anecdote to be updated, by its id.
      const anecdoteToUpdate = state.find(n => n.id === id)  // Find the target anecdote
      
      const updatedAnecdote = {  // Create a new updated anecdote object (orininal anecdote is immutable).
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      
      return state.map(anecdote =>  // Return a new state array, with new anecdote.
        anecdote.id !== id ? anecdote : updatedAnecdote    // Map over the state array: replace the old anecdote with the updated one.
      )
    }
    case 'CREATE': // Handle the CREATE action.
      return [...state, action.data] // Add the new anecdote object to the state array.
    default:
      return state    // Return the current (unchanged) state for any unhandled action.
  }
}

export default anecdoteReducer
