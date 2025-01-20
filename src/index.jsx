import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/style.css';
import { ThemeProvider } from './context/theme';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
);
