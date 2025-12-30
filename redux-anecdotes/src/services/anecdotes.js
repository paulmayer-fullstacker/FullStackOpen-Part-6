// services/anecdotes.js:
const baseUrl = 'http://localhost:3001/anecdotes'   // Base URL. Where our json-server is listening for requests.

const getAll = async () => {              // Fetche all anecdotes from the backend.
  const response = await fetch(baseUrl)   // The Fetch API sends a GET request (default method) to the baseUrl.

  if (!response.ok) {    // Fetch does not throw errors on 404 or 500 status codes. So, manually check if the response was "ok" (status 200-299).
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()    // Parse the JSON body of the response into a JavaScript object/array
}

const createNewAnecdote = async (content) => {    // Sends a POST request to save a new anecdote to the database.
  const options = {
   method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),  // Creating object directly inside stringify, we send the data as a JSON string. The ID is generated automatically by the backend/json-server.
  }

  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()  // The server returns the saved object (including the ID)
}

const updateVote = async (anecdote) => {   // Service to update the vote count on the server. It sends a PUT request to replace an existing anecdote's data on the server.  Used specifically to update the vote count.
  const updatedAnecdote = {      // Create a new object containing the incremented vote count.
    ...anecdote,                // Spread the existing anecdote properties to retain the content and ID.
    votes: anecdote.votes + 1  // Then increment the anecdote.votes value
  }
  
  const options = {
    method: 'PUT',       // PUT used to replace an entire resource (anecdote) at a specific URL
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)   // The URL must point to the specific resource ID: http://localhost:3002/anecdotes/id
  
  if (!response.ok) {
    throw new Error('Failed to update vote')
  }
  
  return await response.json()   // Return the updated object as confirmed by the server.
}

export default { getAll, createNewAnecdote, updateVote }   // Export the service methods as an object for ease of importing.