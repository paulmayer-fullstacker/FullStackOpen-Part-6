// src/main.jsx
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'      // Import functions to create store and combine multiple reducers.
import { Provider } from 'react-redux'                    // Import Provider to connect the Redux store to the React app

import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'  // Logic for managing the list of anecdotes
import filterReducer from './reducers/filterReducer'      // Logic for managing the filter text input

const reducer = combineReducers({     // Combine anecdote and filter reducers into a single root reducer
  anecdotes: anecdoteReducer,         // Assigns the output of anecdoteReducer to the combined reducer's state.anecdotes
  filter: filterReducer,              // Assigns the output of filterReducer to state.filter
})

const store = createStore(reducer)    // Create the Redux store, passing the combinedReducers as the root reducer 

ReactDOM.createRoot(document.getElementById('root')).render(
  // Makes the 'store' object available to all child componentsby offering it as props to Provider
  <Provider store={store}>                                
    <App />
  </Provider>
)
