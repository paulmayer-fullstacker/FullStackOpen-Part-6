// src/components/AnecdoteForm.jsx:
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch() 

   const addAnecdote = (event) => {  // Handler for uncontrolled form submission
    event.preventDefault() // Prevents the page from reloading
    
    const content = event.target.anecdote.value   // Access the input value directly from the form element (uncontrolled)
    event.target.anecdote.value = '' // Clear the input field

    dispatch(createNewAnecdote(content))  // Dispatch result of the action creator exported from anecdoteReducer.
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote"/> 
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm