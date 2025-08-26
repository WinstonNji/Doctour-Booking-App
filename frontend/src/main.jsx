import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import GlobalContext from './context/GlobalContext.jsx'
import DoctorContext from './context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalContext> 
    <DoctorContext>
       <BrowserRouter>
        <App />
      </BrowserRouter>
    </DoctorContext>
  </GlobalContext>
  
)
