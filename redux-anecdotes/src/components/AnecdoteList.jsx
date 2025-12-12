// src/components/AnecdoteList.jsx:
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer' // Import the action creator

const AnecdoteList = () => {
  
  const anecdotes = useSelector(state => state)  // Get the state (the array of anecdotes).
  const dispatch = useDispatch() // Get the dispatch function.

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes) 
  /*
   NOTE:
     Use spreader (...anecdotes to create shallow copy of the anecdotes array, creating a new sortedAnecdotes array ([...anecdotes]).
     Why: Redux state should be immutable, but the JavaScript built-in .sort() method mutates the array it is called on
     Re: sort((a, b) => b.votes - a.votes):  b-a < 0 : a > b,     b-a == 0 : a == b,     b-a > 0 :  a < b 
  */

  const vote = id => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))  // Dispatch result of the action creator exported from anecdoteReducer.
  }

  return (   // 4. Render the sorted list
    <>
      {sortedAnecdotes.map(anecdote => (
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