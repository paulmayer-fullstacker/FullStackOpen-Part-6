// src/components/AnecdoteList.jsx:

import { useSelector, useDispatch } from 'react-redux'          // Hooks to access state and dispatch actions
import { voteForAnecdote } from '../reducers/anecdoteReducer'   // Import the action creator for voting
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  // Pulling specific slices of state from the store
  const anecdotes = useSelector(state => state.anecdotes || [])  // UseSelector reads the state from the Redux store. If not available (yet) use empty array.
  const filter = useSelector(state => state.filter || '')
  
  // const { anecdotes, filter } = useSelector(state => state)   // UseSelector reads the state from the Redux store. Use destructuring to get the required items from the state.
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
 const vote = (anecdote) => {
    // Increment the vote count
    dispatch(voteForAnecdote(anecdote.id))
    
    // Show the notification with the specific anecdote content
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    
    // Side Effect: Clear the notification after 5 seconds
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  

  return (
    <>
      {sortedAnecdotes.map(anecdote => (    // Render the sorted AND filtered list
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList


