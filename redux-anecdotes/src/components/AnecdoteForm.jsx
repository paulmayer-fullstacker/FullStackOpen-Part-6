// src/components/AnecdoteForm.jsx:
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'  // Import action creator for adding a new anecdote, from anecdoteReducer
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch() 

   const addAnecdote = (event) => {  // Handler for uncontrolled form submission
    event.preventDefault()           // Prevents the page from reloading (default submission action.)
    
    const content = event.target.anecdote.value   // Access the input value directly from the form element (uncontrolled)
    event.target.anecdote.value = ''              // Clear the input field after submission.

    dispatch(createNewAnecdote(content))  // Dispatch the CREATE action with the new anecdote content (result of action creator imported from anecdoteReducer).

    // Notification logic
    dispatch(setNotification(`new anecdote '${content}' created`))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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