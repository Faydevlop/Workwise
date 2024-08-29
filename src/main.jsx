import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store.js';
import { CircularProgress } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with React 18's createRoot
root.render(
  <Provider store={store}>
    <PersistGate loading={<CircularProgress />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
