import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

