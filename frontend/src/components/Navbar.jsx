import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { authUser, checkAuth, logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(); // Ensure the user's authentication state is checked on component load.
  }, [checkAuth]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Trigger the logout action.
      alert("Logged out successfully!");
      navigate("/login"); // Redirect to the login page or home.
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => handleNavigation("/home")}>Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigation("/quiz")}>Quiz</a>
            </li>
            <li>
              <a onClick={() => handleNavigation("/leaderboard")}>Leaderboard</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" onClick={() => handleNavigation("/home")}>
          BaNaNa Monkeys
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => handleNavigation("/home")}>Home</a>
          </li>
          <li>
            <a onClick={() => handleNavigation("/quiz")}>Quiz</a>
          </li>
          <li>
            <a onClick={() => handleNavigation("/leaderboard")}>Leaderboard</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {authUser ? (
          <button
            className="btn"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </button>
        ) : (
          <button className="btn" onClick={() => handleNavigation("/login")}>
            Login or Signup
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
