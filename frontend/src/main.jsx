import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import WelcomeFlex from './components/WelcomeFlex.jsx'
import Instructions from './components/Instructions.jsx'
import QuizEasy from './components/QuizEasy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <QuizEasy/>
    <Footer/>
  </StrictMode>,
)
