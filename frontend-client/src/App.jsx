import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPage from "./pages/QuizPage";

const AppContent = () => {
  const location = useLocation(); // Get current location

  return (
    <>
      {/* Render Navbar only if the current path is not /login or /register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
