// Tools we need from React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Router: lets the app change pages without reloading
import { BrowserRouter } from 'react-router-dom'
import './index.css' // our styles
import App from './App.jsx' // main component
// Provider: shares the favorites list with all components
import { FavoritesProvider } from './context/FavoritesContext'

// Find <div id="root"> in index.html and show our app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
      
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
