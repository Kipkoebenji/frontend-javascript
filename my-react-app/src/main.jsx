import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MockApi from './MockApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <MockApi />
  </StrictMode>,
)
