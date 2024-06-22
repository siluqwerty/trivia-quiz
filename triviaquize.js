import React, { useState } from 'react';
import './triviaquize.css';

const TriviaQuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const fetchQuestions = async () => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
    const data = await response.json();
    setQuestions(data.results);
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      <h1>Trivia Quiz App</h1>
      {showScore ? (
        <div>
          <h2>Your score: {score}</h2>
          <button onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowScore(false);
            fetchQuestions();
          }}>Play Again</button>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <div>
              <h2>{questions[currentQuestion].question}</h2>
              {questions[currentQuestion].incorrect_answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(false)}>
                  {answer}
                </button>
              ))}
              <button onClick={() => handleAnswerOptionClick(true)}>
                {questions[currentQuestion].correct_answer}
              </button>
            </div>
          ) : (
            <button onClick={fetchQuestions}>Start Quiz</button>
          )}
        </>
      )}
    </div>
  );
};

export default TriviaQuizApp;