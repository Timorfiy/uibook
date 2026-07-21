import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ToastProvider, applyMode, applyTheme, getStoredMode, getStoredTheme } from '../lib';
import './docs.css';

// Restore the reader's place: theme and mode chosen on a previous visit.
applyTheme(getStoredTheme());
applyMode(getStoredMode());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HashRouter>
  </StrictMode>,
);
