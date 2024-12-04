import React from 'react'
import { useNavigate } from 'react-router-dom'

function WelcomeFlex() {
  const navigate = useNavigate();
  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(/pics/jungle.jpg)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Welcome to BaNaNa Monkeys!!!</h1>
        <p className="mb-5">
        Challenge your brain and have fun while playing our interactive math quiz game! 
        Gaming Monkey is your go-to platform for quick, engaging mini-quiz.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/quiz")}>Get Started</button>
      </div>
    </div>
    </div>
  )
}

export default WelcomeFlex