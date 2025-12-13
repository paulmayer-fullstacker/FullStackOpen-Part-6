// src/App.jsx:
import AnecdoteForm from './components/AnecdoteForm'     // Import component for creating new anecdotes
import AnecdoteList from './components/AnecdoteList'     // Component for listing and voting for anecdotes
import Filter from './components/Filter'                 // Component for the filter input

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter /> {/* Filter input text area placed here */}
      <AnecdoteList /> {/* Followed by List of filtered and sorted anecdotes (AnecdoteList component) */}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
