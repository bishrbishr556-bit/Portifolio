import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminPanel from './AdminPanel.tsx';
import './index.css';

// Route to admin panel if URL path is /admin
const isAdmin = window.location.pathname === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminPanel /> : <App />}
  </StrictMode>,
);
