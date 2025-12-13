// src/components/AnecdoteList.jsx:

import { useSelector, useDispatch } from 'react-redux'          // Hooks to access state and dispatch actions
import { voteForAnecdote } from '../reducers/anecdoteReducer'   // Import the action creator for voting

const AnecdoteList = () => {
  
  const { anecdotes, filter } = useSelector(state => state)   // UseSelector reads the state from the Redux store. Use destructuring to get the required items from the state.
  const dispatch = useDispatch()                              // Hook to get the dispatch function.

  // Filter anecdotes based on the current filter state
  const filteredAnecdotes = anecdotes.filter(anecdote =>           // Filter anecdotes based on the current filter state
    anecdote.content.toLowerCase().includes(filter.toLowerCase())  // Filter by: anecdote content (lowercase) includes the filter text (lowercase)
  )

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)   // Create shallow copy of filtered list, then sort by votes descending.
  /*
   NOTE:
     Use spreader (...anecdotes to create shallow copy of the anecdotes array, creating a new sortedAnecdotes array ([...anecdotes]).
     Why: Redux state should be immutable, but the JavaScript built-in .sort() method mutates the array it is called on
     Re: sort((a, b) => b.votes - a.votes):  b-a < 0 : a > b,     b-a == 0 : a == b,     b-a > 0 :  a < b 
  */

  const vote = id => {             // Function to handle a vote click
    console.log('vote', id)
    dispatch(voteForAnecdote(id))  // Dispatch the VOTE action, providing the ID of the anecdote to update (result of the action creator exported from anecdoteReducer).
  }

  return (
    <>
      {sortedAnecdotes.map(anecdote => (    // Render the sorted AND filtered list
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList