// src/components/AnecdoteForm.jsx:
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer' // Import the THUNK
// import { createNewAnecdote } from '../reducers/anecdoteReducer'  // Import action creator for adding a new anecdote, from anecdoteReducer
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes' // Import the service

const AnecdoteForm = () => {
  const dispatch = useDispatch() 

   const addAnecdote = async (event) => {  // Asynchronous handler for uncontrolled form submission
    event.preventDefault()           // Prevents the page from reloading (default submission action.)
    
    const content = event.target.anecdote.value   // Access the input value directly from the form element (uncontrolled)
    event.target.anecdote.value = ''              // Clear the input field after submission.

    dispatch(createAnecdote(content))   // Dispatch the Thunk: This handles the backend save and the state update

    dispatch(setNotification(`new anecdote '${content}' created`, 5))   // The Thunk handles the display and the 5-second timer automatically.
    
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote"/>    {/* The name attribute allows access via event.target.anecdote.value */}
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm