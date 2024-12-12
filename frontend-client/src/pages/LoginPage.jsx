import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Menggunakan Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token-pathgrow", response.data.token); // Simpan token di localStorage
      navigate("/dashboard"); // Arahkan ke halaman dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Failed to login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex w-full h-full shadow-lg bg-white">
        <div className="w-1/2 p-10 flex flex-col justify-center" style={{backgroundColor: '#F4CA44'}}>
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
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="text-white py-2 rounded-md" style={{backgroundColor: '#04AF09'}}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
