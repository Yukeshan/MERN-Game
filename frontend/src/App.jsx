import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import QuizPage from './pages/QuizPage'
import QuizEasy from './components/QuizEasy.jsx'
import QuizMedium from './components/QuizMedium.jsx'
import QuizHard from './components/QuizHard.jsx'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from "lucide-react"
import MathNews from './pages/NewsPage.jsx'

const App = () => {

      const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

      useEffect(()=>{
        checkAuth()
      },[checkAuth]);

      console.log({authUser});

      if(isCheckingAuth && !authUser){
        return (
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>

          </div>
        )
      }



  return (

    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <LoginPage/>} />
        <Route path='/home' element={authUser ? <HomePage/> : <LoginPage/>} />
        <Route path='/signup' element={authUser ? <HomePage/> : <SignupPage/>} />
        <Route path='/login' element={authUser ? <HomePage/> : <LoginPage/>} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <LoginPage/>} />
        <Route path="/quiz" element={authUser ? <QuizPage />: <LoginPage/>} />
        <Route path="/quiz/easy" element={authUser ? <QuizEasy />: <LoginPage/>} />
        <Route path="/quiz/medium" element={authUser ? <QuizMedium />: <LoginPage/>} />
        <Route path="/quiz/hard" element={authUser ? <QuizHard />: <LoginPage/>} />
        <Route path="/math-news" element={<MathNews/>} />

      </Routes>

      <Footer/>
    </div>

  )
}

export default App