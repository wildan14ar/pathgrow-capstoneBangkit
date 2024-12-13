import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Middleware untuk melindungi rute
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token-pathgrow"); // Periksa token di localStorage

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  return children; // Jika ada token, tampilkan konten rute
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
