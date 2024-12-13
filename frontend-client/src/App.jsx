import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./middleware/ProtectedRoute";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route path="/quiz" element={
           // <ProtectedRoute>
            <QuizPage />
           // </ProtectedRoute>
        } />
        <Route path="/result" element={
          // <ProtectedRoute>
            <ResultPage />
          // </ProtectedRoute>
          } />
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
