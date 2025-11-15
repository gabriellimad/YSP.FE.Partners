import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Usando o Router
import App from './App'; // O App já não precisa envolver o Router

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router> {/* Envolva o App com o Router aqui */}
      <App />
    </Router>
  </React.StrictMode>
);
