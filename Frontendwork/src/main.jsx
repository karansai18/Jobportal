import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
const persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading ={null} persistor={persistor}>
            <App />
      </PersistGate>
      
    </Provider>
    <Toaster />
  </React.StrictMode>,
)
