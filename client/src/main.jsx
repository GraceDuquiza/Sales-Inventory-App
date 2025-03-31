import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'



// ✅ Import SaleProvider to enable global sale updates
import { SaleProvider } from './context/SaleContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SaleProvider>
        <App />
      </SaleProvider>
    </BrowserRouter>
  </React.StrictMode>
)
