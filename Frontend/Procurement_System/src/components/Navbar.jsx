import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import OSASLogo from "../assets/OSAS.png"

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-maroon text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="logo h-16 w-16">
              <img
                src={OSASLogo}
                alt="logo"
                style={{ height: "40px", marginRight: "10px" }}
              ></img>
            </div>
        <Link
          to="/"
          className="text-orange-500 text-2xl font-bold hover:text-orange-400 transition"
        >
          Procurement
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-orange-500 hover:text-orange-400 focus:outline-none"
            onClick={() =>
              document.getElementById("menu").classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

     
        <div id="menu" className="hidden lg:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className="text-white hover:text-orange-500 transition"
              >
                Home
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-white hover:text-orange-500 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div>
                </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
