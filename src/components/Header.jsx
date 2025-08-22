import React, { useState, useEffect } from "react";
import logo5 from "../assets/images/rooms/logo5.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const [header, setHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handle = () => {
    Navigate("/Login");
  };
  return (
    <header className="header w-screen">
      <div
        className={`${header ? "py-3 shadow-lg" : "py-1"} fixed z-50 w-full bg-gray-900 text-white transition-all duration-500`}
      >
        <div className="mx-auto flex items-center justify-between px-2 sm:px-6 md:px-10 w-full max-w-screen-2xl">
          {/* header logo */}
          <a href="/" className="pl-2 sm:pl-8 md:pl-[60px] flex-shrink-0">
            <img src={logo5} alt="header logo" className="w-[50px] sm:w-[70px] md:w-[80px]" />
          </a>

          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden ml-auto mr-2 p-2 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* header menu */}
          <nav
            className={`${menuOpen ? "flex" : "hidden"} flex-col absolute top-full left-0 w-full bg-gray-900 lg:static lg:flex lg:flex-row lg:w-auto lg:bg-transparent z-40 transition-all duration-300`}
          >
            <ul className="flex flex-col lg:flex-row items-center justify-center gap-x-6 text-xl gap-y-2 pr-[200px] ">
              <a href="/" className="transition hover:text-accent  px-2 py-1">Home</a>
              <a href="/rooms" className="transition hover:text-accent px-2 py-1">Rooms</a>
              <a href="/restaurants" className="transition hover:text-accent px-2 py-1">Restaurants</a>
              <a href="/contact" className="transition hover:text-accent px-2 py-1">Contact</a>
              <a href="/about" className="transition hover:text-accent px-2 py-1">About</a>
            </ul>
            <div className="button flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-white w-full sm:w-auto mt-2 lg:mt-0 lg:mr-[40px]">
              {isAuthenticated() ? (
                <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
                  <span className="text-sm">Welcome, {user.name}</span>
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => navigate('/admin')}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Admin Panel
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/pages/Login')}
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
