import React from "react";
import "../css/ResultPage.css"; 

const ResultPage = () => {
  return (
    <div className="result-page">
      
      <main className="result-content">
        <h1>Your most likely job is a programmer</h1>

        <div className="progress-bars">
          <div className="progress-item">
            <span>Problem Solving</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: "80%" }}></div>
            </div>
            <span>80%</span>
          </div>

          <div className="progress-item">
            <span>Logical Thinking</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: "70%" }}></div>
            </div>
            <span>70%</span>
          </div>

          <div className="progress-item">
            <span>Teamwork</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
            <span>60%</span>
          </div>

          <div className="progress-item">
            <span>Creativity</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: "50%" }}></div>
            </div>
            <span>50%</span>
          </div>
        </div>

        <div className="result-details">
          <img
            src="/images/programmer-illustration.png" 
            alt="Programmer illustration"
            className="result-image"
          />
          <p>
            Based on the quiz results, you show great potential to become a
            programmer! Your problem-solving skills, logical thinking, interest
            in technology, and strong curiosity indicate that you have a solid
            foundation to thrive in the programming world.
          </p>
        </div>

        <a href="/quiz" className="quiz-again">Quiz again</a>
      </main>
    </div>
  );
};

export default ResultPage;
