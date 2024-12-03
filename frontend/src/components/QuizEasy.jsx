import React, { useState, useEffect } from "react";

function QuizEasy() {
  const [questionImage, setQuestionImage] = useState("");
  const [solution, setSolution] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [lifelines, setLifelines] = useState(3);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAnswerSectionVisible, setIsAnswerSectionVisible] = useState(true);
  const [isTryAgainButtonVisible, setIsTryAgainButtonVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isGameStarted) {
      const fetchQuizData = async () => {
        try {
          const response = await fetch("https://marcconrad.com/uob/banana/api");
          const data = await response.json();

          setQuestionImage(data.question);
          setSolution(data.solution);
          setAnswer("");
          setIsCorrect(null);
          setLifelines(3);
          setTimer(30);
          setIsTimerRunning(true);
          setIsGameStarted(true);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };

      fetchQuizData();
    }

    const timerInterval = setInterval(() => {
      if (isTimerRunning && timer > 0) {
        setTimer((prev) => prev - 1);
      } else if (timer === 0) {
        clearInterval(timerInterval);
        setIsTimerRunning(false);
        setIsAnswerSectionVisible(false);
        setIsTryAgainButtonVisible(true);
        setMessage("Time's up! Please try again.");
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isGameStarted, isTimerRunning, timer]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const refreshQuiz = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api");
      const data = await response.json();
  
      setQuestionImage(data.question);
      setSolution(data.solution);
      setAnswer("");
      setIsCorrect(null);
      setLifelines(3);
      setTimer(30);
      setIsTimerRunning(true);
      setIsAnswerSectionVisible(true);
      setIsTryAgainButtonVisible(false);
      setMessage("");
    } catch (error) {
      console.error("Error refreshing quiz data:", error);
      setMessage("⚠️ Error loading new question. Please try again.");
    }
  };
  

  const handleSubmit = () => {
    if (parseInt(answer) === solution) {
      setIsCorrect(true);
      setMessage("🎉 Correct! Great job!");
      setIsTimerRunning(false); // Pause the timer
      setTimeout(() => {
        refreshQuiz();
      }, 2000); // Add a slight delay before refreshing
    } else {
      setIsCorrect(false);
      setMessage("❌ Incorrect! Try again.");
      if (lifelines > 0) {
        setLifelines((prev) => prev - 1);
      }
      if (lifelines - 1 === 0) { // When lifelines reach zero
        setIsTimerRunning(false);
        setIsAnswerSectionVisible(false);
        setIsTryAgainButtonVisible(true);
        setMessage("No lifelines left! Please try again.");
      }
    }
  };
  
  
  
  

  const handleTryAgain = () => {
    setIsGameStarted(false);
    setIsTimerRunning(true);
    setIsAnswerSectionVisible(true);
    setIsTryAgainButtonVisible(false);
    setMessage("");
    setAnswer("");
    setIsCorrect(null);
    setLifelines(3);
    setTimer(30);
  };

  return (
    <div className="relative min-h-screen bg-purple-200 flex flex-col items-center justify-center py-8">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-6 text-center text-info-content">
        Find the value of the banana and type it in the answer box below.
      </h1>

      {/* Info Section */}
      <div className="card w-4/5 max-w-4xl bg-base-100 shadow-xl mb-6">
        <div className="card-body flex items-start space-x-4">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded bg-gray-300"></div>
            </div>
            <div>
              <p className="text-sm font-medium">Username: </p>
              <p className="text-sm">Email: </p>
              <p className="text-sm">Total Score: </p>
            </div>
          </div>
          {/* Lifelines */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-base-200 p-2 rounded-lg shadow-md">
            <p className="font-medium mr-2">Lifelines:</p>
            {[...Array(3)].map((_, index) => (
              <span
                key={index}
                role="img"
                aria-label="monkey"
                className={index < lifelines ? "visible" : "invisible"}
              >
                🐵
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="card w-4/5 max-w-4xl bg-base-100 shadow-xl relative">
        <div className="card-body">
          {/* Timer */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Timer: {timer}s</p>
            <progress className="progress progress-primary w-full" value={timer} max="30"></progress>
          </div>

          {/* Question */}
          <div className="flex items-center justify-center bg-base-200 p-6 rounded-lg mb-4">
            {questionImage ? (
              <img
                src={questionImage}
                alt="Quiz Equations"
                className="max-h-96 object-contain"
              />
            ) : (
              <p>Loading question...</p>
            )}
          </div>

          {/* Answer Section or Try Again Section */}
          {isAnswerSectionVisible ? (
  <div className="flex flex-col items-center space-y-4">
    <div className="form-control">
      <label htmlFor="answer" className="label">
        <span className="label-text">Answer:</span>
      </label>
      <input
        id="answer"
        type="text"
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Enter your answer"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
    <button onClick={handleSubmit} className="btn btn-primary w-full max-w-xs">
      Submit
    </button>
    {message && (
      <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
        {message}
      </p>
    )}
  </div>
) : (
  <div className="flex flex-col items-center justify-center space-y-4">
    <p className="text-red-500 font-bold">{message}</p>
    <button onClick={handleTryAgain} className="btn btn-warning">
      Try Again
    </button>
  </div>
)}

        </div>
      </div>


    </div>
  );
}

export default QuizEasy;
