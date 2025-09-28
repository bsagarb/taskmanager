import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,


)
