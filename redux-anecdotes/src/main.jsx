// src/main.jsx
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'    // Import Provider to connect the Redux store to the React app

import App from './App'
import store from './store'          // Centralized state container

ReactDOM.createRoot(document.getElementById('root')).render(
  // Make the 'store' object available to all child components by offering it as props to Provider
  <Provider store={store}>                                
    <App />
  </Provider>
)
