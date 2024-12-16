import { useState, useEffect } from "react";

const QuizApp = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    gender: 1, // 0: Male, 1: Female
    absence_days: 3,
    weekly_self_study_hours: 10,
    part_time_job: 0, // 0: False, 1: True
    extracurricular_activities: 1, // 0: False, 1: True
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/data/quizData.json");
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : Number(value),
    }));
  };

  const startQuiz = () => setIsEditingPersonalInfo(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
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

  const handleSubmit = async () => {
    if (Object.keys(answeredQuestions).length !== quizData.length) {
      setShowPopup(true);
      return;
    }

    let finalScore = 0;
    const categoryScores = {};
    const categoryTotals = {};

    quizData.forEach((question, index) => {
      const userAnswer = answeredQuestions[index];
      if (userAnswer === question.correctAnswer) {
        finalScore++;
        categoryScores[question.label] = (categoryScores[question.label] || 0) + 1;
      }
      categoryTotals[question.label] = (categoryTotals[question.label] || 0) + 1;
    });

    const calculateCategoryPercentages = (categoryScores, categoryTotals) => {
      const percentages = {};
      Object.keys(categoryTotals).forEach((category) => {
        const correctAnswers = categoryScores[category] || 0;
        const totalQuestions = categoryTotals[category] || 1;
        percentages[category] = Math.round((correctAnswers / totalQuestions) * 100);
      });
      return percentages;
    };

    const calculateAverageScore = (percentages) => {
      const categories = Object.values(percentages);
      if (categories.length === 0) return 0;
      const totalPercentage = categories.reduce((sum, value) => sum + value, 0);
      return Math.round(totalPercentage / categories.length);
    };

    const categoryPercentages = calculateCategoryPercentages(categoryScores, categoryTotals);
    const averageScore = calculateAverageScore(categoryPercentages);

    const dataToSend = {
      ...personalInfo,
      math_score: categoryPercentages.Math || 0,
      history_score: categoryPercentages.History || 0,
      physics_score: categoryPercentages.Physics || 0,
      chemistry_score: categoryPercentages.Chemistry || 0,
      biology_score: categoryPercentages.Biology || 0,
      english_score: categoryPercentages.English || 0,
      geography_score: categoryPercentages.Geography || 0,
      average_score: averageScore,
    };

    console.log("Sending data to backend:", dataToSend);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.success) {
        setPrediction(data.prediction);
      } else {
        console.error("Backend error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
    } finally {
      setIsLoading(false);
      setIsQuizFinished(true);
    }
  };

  if (isEditingPersonalInfo) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0f0f0", borderRadius: "10px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Personal Information</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ marginBottom: "5px", display: "block" }}>Gender:</label>
            <select
              name="gender"
              value={personalInfo.gender}
              onChange={handlePersonalInfoChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </select>
          </div>
          <div>
            <label style={{ marginBottom: "5px", display: "block" }}>Part Time Job:</label>
            <input
              type="checkbox"
              name="part_time_job"
              checked={personalInfo.part_time_job === 1}
              onChange={handlePersonalInfoChange}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <div>
            <label style={{ marginBottom: "5px", display: "block" }}>Extracurricular Activities:</label>
            <input
              type="checkbox"
              name="extracurricular_activities"
              checked={personalInfo.extracurricular_activities === 1}
              onChange={handlePersonalInfoChange}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          {Object.keys(personalInfo)
            .filter((key) => !["gender", "part_time_job", "extracurricular_activities"].includes(key))
            .map((key) => (
              <div key={key}>
                <label style={{ marginBottom: "5px", display: "block" }}>
                  {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={personalInfo[key]}
                  onChange={handlePersonalInfoChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  min="0"
                />
              </div>
            ))}
          <button
            onClick={startQuiz}
            style={{
              backgroundColor: "#04AF09",
              color: "#FFF",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", fontSize: "20px" }}>Loading prediction...</div>
        ) : (
          <div>
            <h1>Quiz Results</h1>
            <h2>Career Prediction:</h2>
            {prediction && (
              <div>
                {Object.entries(prediction)
                  .filter(([_, probability]) => probability > 0)
                  .map(([career, probability]) => (
                    <div
                      key={career}
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{career}</span>
                      <div
                        style={{
                          width: `${probability}%`,
                          backgroundColor: "#04AF09",
                          height: "20px",
                          borderRadius: "5px",
                          minWidth: "50px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {probability.toFixed(2)}%
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }}>
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
          <p style={{ marginBottom: "10px" }}>Please answer all questions before submitting!</p>
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
      <div style={{ width: "300px", background: "#f0f0f0", padding: "20px" }}>
        {quizData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
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
        <h2>Question {currentQuestionIndex + 1} of {quizData.length}</h2>
        <h2 style={{ color: "#04AF09" }}>{quizData[currentQuestionIndex]?.label}</h2>
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
            Previous
          </button>
          {currentQuestionIndex + 1 === quizData.length ? (
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
              Submit
            </button>
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
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
