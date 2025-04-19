import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance yang sudah dikonfigurasi

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    try {
      const response = await api.post("/auth/login", { emailOrUsername, password });

      // Simpan token dan user data di localStorage
      localStorage.setItem("token-pathgrow", response.data.token); // Simpan token
      localStorage.setItem("user-pathgrow", JSON.stringify(response.data.user)); // Simpan user

      navigate("/dashboard"); // Redirect ke dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login"); // Tampilkan pesan error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen shadow-lg bg-white">
        {/* Left Section */}
        <div
          className="w-full md:w-[50%] p-10 flex flex-col justify-center"
          style={{ backgroundColor: "#F4CA44" }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">PathGrow</h1>
          <p className="text-white text-lg mb-6">
            A platform designed to provide learning experiences tailored to
            individuals’ needs.
          </p>
          <Link to="/register">
            <button className="bg-white text-green-600 font-bold px-6 py-2 rounded-md">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[50%] p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              className="border rounded-lg px-4 py-2"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white py-2 rounded-md flex justify-center items-center"
              style={{ backgroundColor: "#04AF09" }}
              disabled={loading}
            >
              {loading ? (
                <span className="loader border-white border-2 rounded-full w-5 h-5"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
