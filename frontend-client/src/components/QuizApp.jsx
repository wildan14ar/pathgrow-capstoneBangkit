import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuizApp = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
    if (Object.keys(answeredQuestions).length !== quizData.length) {
      setShowPopup(true);
      return;
    }

    let finalScore = 0;
    const finalCategoryScores = {};

    quizData.forEach((question, index) => {
      const userAnswer = answeredQuestions[index];
      if (userAnswer === question.correctAnswer) {
        finalScore++;
        finalCategoryScores[question.label] = (finalCategoryScores[question.label] || 0) + 1;
      }
    });

    setScore(finalScore);
    setCategoryScores(finalCategoryScores);
    setIsQuizFinished(true);
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(answeredQuestions[index] || null);
  };

  if (isQuizFinished) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Hasil Kuis</h1>
        <p>Skor Total Anda: {score} / {quizData.length}</p>
        <h2>Hasil per Kategori:</h2>
        <div>
          {Object.entries(categoryScores).map(([category, score]) => {
            const totalQuestions = quizData.filter((q) => q.label === category).length;
            const percentage = Math.round((score / totalQuestions) * 100);
            return (
              <div key={category} style={{ marginBottom: "20px" }}>
                <h3>{category}</h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      height: "20px",
                      width: "100%",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginRight: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percentage}%`,
                        backgroundColor: "#04AF09",
                      }}
                    ></div>
                  </div>
                  <span>{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#04AF09",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Mulai Lagi
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }} className="m-10">
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFF",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <p style={{ marginBottom: "10px" }}>Harap jawab semua pertanyaan sebelum submit!</p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#04AF09",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      )}
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
              backgroundColor: currentQuestionIndex === index ? "#FFC107" : answeredQuestions[index] ? "#04AF09" : "#E0E0E0",
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
          <h2 style={{ color: "#04AF09" }}>{quizData[currentQuestionIndex]?.label}</h2>
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
              backgroundColor: currentQuestionIndex === 0 ? "#E0E0E0" : "#04AF09",
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
            <Link to="/result">
              <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#04AF09",
                color: "#FFF",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Selesai
              </button>
            </Link>
            
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              style={{
                backgroundColor: !selectedOption ? "#E0E0E0" : "#04AF09",
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
