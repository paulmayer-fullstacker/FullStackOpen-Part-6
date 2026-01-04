// src/App.jsx:

// The main orchestrator of the UI.

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotify } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()    // Access the queryClient instance defined in main.jsx to interact with the cache.
  const notify = useNotify()              // Initialise custom notification logic. Hook for displaying temporary notifications.

  const updateAnecdoteMutation = useMutation({    // Mutation for voting. useMutation is used for server side-effects (Changing data: Create, Update, Delete). It provides a 'mutate' function to trigger the change.
    mutationFn: updateAnecdote,                  // updateAnecdote is the fetch call to the server.
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])  // Manual cache update (Optimistic-style UI update). Retrieve the current list of anecdotes from the local cache, so the UI updates instantly without a fresh GET request.
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => // Direct QueryClient to update the 'anecdotes' data without refetching from the server. Map through the current cache and replace the old anecdote with the one returned by the server.
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote  // if anecdote.id no updated target retain anecdote, else update with updatedAnecdote.
      ))
      
      // Notify vote
      // dispatch({ type: 'SET', payload: `anecdote '${updatedAnecdote.content}' voted` })
      // setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)  // Refactored to useNotify in NotificationContext.js
      notify(`anecdote '${updatedAnecdote.content}' voted`)  // Trigger the custom notify hook to show a success message (5 sec).
    },
  })

  const { data, isPending, isError } = useQuery({  // useQuery: used for fetching and synchronising data from the server. 'data' holds the response, 'isPending' is true while loading, 'isError' is true if fetch fails.
    queryKey: ['anecdotes'],           // Unique label for this data in the cache.
    queryFn: getAnecdotes,            // Function that returns a promise of the data.
    retry: 1   // If failure, only retry server conection once. Thus reducing waite time for the error screen to appear.
  })          // "loading data..." is briefly displayed before the error notification ("anecdote service not available due to problems in server").

  const handleVote = (anecdote) => {   // Event handler for the vote button. 
    updateAnecdoteMutation.mutate({    // It takes the existing anecdote object and creates a copy with the votes incremented by 1.
      ...anecdote, 
      votes: anecdote.votes + 1 
    })
  }
  // Handle loading/error states before rendering data
  if (isPending) return <div>loading data...</div>   // If the query is still in the first fetch, show a loading indicator.
  if (isError) return <div>anecdote service not available due to problems in server</div>   // If the query fails (and retries exhausted), show an error message.

  const anecdotes = data  // Assign data (the object returned by the useQuery hook), to anecdotes variable.

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />    {/* Notification only appears if the context state is not null */}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (  // Iterate through the cached anecdotes rendering them to the screen. Remember const anecdotes points to data.
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>   {/* onClick, trigger handleVote function which calls the mutation */}
          </div>
        </div>
      ))}
    </div>
  )
}
export default App