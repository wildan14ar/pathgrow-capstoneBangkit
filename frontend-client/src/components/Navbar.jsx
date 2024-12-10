import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="./icon.png" alt="logo" className="h-16 w-auto" />
        </Link>
        <div>
          <Link to="/login">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Sign In</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
