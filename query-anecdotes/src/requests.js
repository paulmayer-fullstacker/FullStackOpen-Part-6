// src/requests.js:

// The communication layer. Interface to the backend (JSON Server).

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>    // Fetches all anecdotes from the server. Used by TanStack Query's 'queryFn'.
  fetch(baseUrl).then(response => {      // Send a GET request to the baseUrl
    if (!response.ok) throw new Error('Network response was not ok')     // if HTTP status code not okay (not in 200-299 range), throw an error to trigger React Query's 'isError' state.
    return response.json()             // Parse the body of the response as JSON and return the resulting promise.
  })

export const createAnecdote = (newAnecdote) =>    // Sends a new anecdote object to the server to be saved.  Used by 'useMutation' in AnecdoteForm.jsx.
  fetch(baseUrl, {
    method: 'POST',                                      // Specify the HTTP method for creating data.
    headers: { 'Content-Type': 'application/json' },    // Inform the server to expect JSON data.
    body: JSON.stringify(newAnecdote)                  // Convert the JavaScript object into a JSON string.
  }).then(async response => {
    // Custom error handling for server-side validation
    if (!response.ok) {   // If the server returns an error (like 400 Bad Request is length < 5),
      throw new Error('too short anecdote, must have length 5 or more')  // extract the error and throw it.  This error message is what 'notify(error.message)' uses in the component.
    }
    return response.json()   // Return the newly created anecdote (which now includes an ID from the server).
  })

export const updateAnecdote = (updatedAnecdote) =>  // Updates an existing anecdote (primarily used for incrementing votes). Used by 'useMutation' in App.jsx.
  fetch(`${baseUrl}/${updatedAnecdote.id}`, {      // Construct the URL for the specific item using its unique ID (eg: .../anecdotes/123)
    method: 'PUT',                                // Specify PUT to replace the existing resource with updated data.
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }).then(response => response.json())         // We assuming the update works, return the updated object.