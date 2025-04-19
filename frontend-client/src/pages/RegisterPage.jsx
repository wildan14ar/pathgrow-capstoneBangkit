import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Menggunakan Axios instance

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        username,
        email,
        password,
      });

      console.log(response.data); // Debug response
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register"); // Show error message
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
          <Link to="/login">
            <button className="bg-white text-green-600 font-bold px-6 py-2 rounded-md">
              Sign In
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[50%] p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="border rounded-lg px-4 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
  );
};

export default RegisterPage;
