import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Choose Your Difficulty</h1>
      <div className="flex flex-col space-y-4">
        <button
          className="btn btn-primary text-lg px-6 py-3 rounded-md shadow-md"
          onClick={() => handleNavigation('/quiz/easy')}
        >
          Easy
        </button>
        <button
          className="btn btn-warning text-lg px-6 py-3 rounded-md shadow-md"
          onClick={() => handleNavigation('/quiz/medium')}
        >
          Medium
        </button>
        <button
          className="btn btn-danger text-lg px-6 py-3 rounded-md shadow-md"
          onClick={() => handleNavigation('/quiz/hard')}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
