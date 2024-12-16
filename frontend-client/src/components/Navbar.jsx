import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Periksa apakah token login ada di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token-pathgrow");
    setIsLoggedIn(!!token); // Jika token ada, set isLoggedIn menjadi true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token-pathgrow"); // Hapus token dari localStorage
    setIsLoggedIn(false); // Set isLoggedIn menjadi false
    navigate("/login"); // Arahkan kembali ke halaman login
  };

  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="./icon.png" alt="logo" className="h-16 w-auto" />
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center">
                <FaUserCircle className="text-3xl text-green-600 cursor-pointer" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 font-bold space-x-2"
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: '#04AF09' }}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
