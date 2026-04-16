import { useState, useContext } from "react"; // ✅ added useContext
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // ✅ fixed
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-600";

  // ✅ define handleLogout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Crowdfund</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium items-center">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkStyle}>
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/create-project" className={linkStyle}>
                Create Project
              </NavLink>
              <span className="ml-4 mr-2">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 "
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className="block" onClick={() => setOpen(false)}>
            About
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className="block" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className="block" onClick={() => setOpen(false)}>
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/create-project" className="block" onClick={() => setOpen(false)}>
                Create Project
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="inline-block bg-red-500 px-3 py-1 rounded text-white text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}