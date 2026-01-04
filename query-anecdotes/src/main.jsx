// src/main.jsx

/*  
  React application that combines TanStack Query (for server state management),
  and the Context API with useReducer (for local UI notification state).
*/

import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationProvider' // Import provider
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(     // App is now wrapped in two Providers.
  <QueryClientProvider client={queryClient}>                {/* QueryClientProvider allows any component to access the server cache. */}
    <NotificationContextProvider>                         {/*  NotificationContextProvider allows any component to access the notification state. */}
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)