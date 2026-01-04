// src/components/AnecdoteForm.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  // const dispatch = useNotificationDispatch()
  const notify = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      
      // dispatch({ type: 'SET', payload: `anecdote '${newAnecdote.content}' created` })
      // setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {   // Handle the failed POST request, i.e., input anecdote <5 chars long.
      // dispatch({ type: 'SET', payload: error.message })
      // setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
      notify(error.message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    let content = event.target.anecdote.value // Make content a var, with 'let', so content can be modified.
    event.target.anecdote.value = ''
    // Redundant validation and default anecdote. Error handling now in place for invalid (<5 char) anecdote input.
    // if (content.length < 5) {  // if content too short, modify to default anecdote.
    //  content = 'A default anecdote is created, if the user input is less than 5 characters in length.'
    // }

    newAnecdoteMutation.mutate({ content, votes: 0 })  // if content < 5 chars, the catch block in requests.js throws, triggering onError
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
