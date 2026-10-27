import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/main.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, <App />, {
      onRecoverableError(error) {
        // Log recoverable notices gracefully
        console.warn('Hydration notice (recovering):', error?.message || error);
      },
    });
  } else {
    createRoot(rootElement).render(<App />);
  }
}
