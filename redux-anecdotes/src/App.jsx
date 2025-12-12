// src/App.jsx:
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList /> {/* Use the new AnecdoteList component */}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
