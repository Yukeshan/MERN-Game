import React from 'react'

function Instructions() {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img style={{backgroundImage:"url('pics/banana.jpg')"}}
      src="pics/monkeyCartoon.png"
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Instructions</h1>
      <p className="py-6">
        Step 1 : Log in or register by clicking the option in the top-right corner.
      </p>
      <p className="py-6">
        Step 2 : Go to the Quiz Page.
      </p>
      <p className="py-6">
        That's all<br/>
        Enjoy!
      </p>
      
    </div>
  </div>
</div>
  )
}

export default Instructions