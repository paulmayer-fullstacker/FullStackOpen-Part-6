// src/App.jsx:
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'     // Import component for creating new anecdotes
import AnecdoteList from './components/AnecdoteList'     // Component for listing and voting for anecdotes
import Filter from './components/Filter'                 // Component for the filter input
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter /> {/* Filter input text area placed here */}
      <AnecdoteList /> {/* Followed by List of filtered and sorted anecdotes (AnecdoteList component) */}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
