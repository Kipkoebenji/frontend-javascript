import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterForm from './RegisterForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterForm />
  </StrictMode>,
)
