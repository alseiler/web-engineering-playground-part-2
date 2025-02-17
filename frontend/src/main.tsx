import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Renders the main <App /> component into the #root element in index.html
const rootElement = document.getElementById('root');

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
