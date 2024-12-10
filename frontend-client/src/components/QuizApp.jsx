import { useState, useEffect } from "react";

const QuizApp = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    fetch("/data/quizData.json")
      .then((res) => res.json())
      .then(setQuizData);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnsweredQuestions({ ...answeredQuestions, [currentQuestionIndex]: option });
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) =>
        answeredQuestions[currentQuestionIndex] === undefined ? prevScore + 1 : prevScore
      );
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(answeredQuestions[currentQuestionIndex + 1] || null);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(answeredQuestions[currentQuestionIndex - 1] || null);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === quizData[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) =>
        answeredQuestions[currentQuestionIndex] === undefined ? prevScore + 1 : prevScore
      );
    }
    alert(`Quiz selesai! Skor Anda adalah: ${score} / ${quizData.length}`);
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(answeredQuestions[index] || null);
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }} className="m-10">
      <div
        style={{ width: "300px", background: "#f0f0f0", padding: "20px" }}
        className="flex flex-row flex-wrap gap-3 justify-around items-start rounded-md"
      >
        {quizData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionJump(index)}
            style={{
              display: "block",
              padding: "10px",
              backgroundColor: currentQuestionIndex === index ? "#FFC107" : "#E0E0E0",
              border: "none",
              borderRadius: "20%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px", flex: 1 }}>
        <div className="flex justify-between">
          <h2>Soal {currentQuestionIndex + 1} dari {quizData.length}</h2>
          <h2 style={{ color: "#4CAF50" }}>{quizData[currentQuestionIndex]?.label}</h2>
        </div>
        <p>{quizData[currentQuestionIndex]?.question}</p>
        <div>
          {quizData[currentQuestionIndex]?.options.map((option, i) => (
            <div
              key={i}
              onClick={() => handleOptionSelect(option)}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: selectedOption === option ? "2px solid #FFC107" : "1px solid #ccc",
                background: selectedOption === option ? "#FFECB3" : "#FFF",
                cursor: "pointer",
              }}
            >
              {option}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            style={{
              backgroundColor: currentQuestionIndex === 0 ? "#E0E0E0" : "#4CAF50",
              color: currentQuestionIndex === 0 ? "#9E9E9E" : "#FFF",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            Sebelumnya
          </button>
          {currentQuestionIndex + 1 === quizData.length ? (
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4CAF50",
                color: "#FFF",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Selesai
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              style={{
                backgroundColor: !selectedOption ? "#E0E0E0" : "#4CAF50",
                color: !selectedOption ? "#9E9E9E" : "#FFF",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: !selectedOption ? "not-allowed" : "pointer",
              }}
            >
              Berikutnya
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;