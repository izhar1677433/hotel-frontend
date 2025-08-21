import React, { useState, useEffect } from "react";
import logo5 from "../assets/images/rooms/logo5.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const [header, setHeader] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });
  const handle = () => {
    Navigate("/Login");
  };
  return (
    <header className="header w-full">
      <div
        className={`$${
          header ? "py-3 shadow-lg" : " py-1"
        } fixed z-50 w-full bg-gray-900 text-white transition-all duration-500`}
      >
        <div className="mx-auto flex flex-col items-center gap-y-4 px-2 sm:px-6 md:px-10 lg:flex-row lg:justify-between lg:gap-y-0 w-full">
          {/* header logo */}
          <a href="/" className="pl-4 sm:pl-8 md:pl-[60px] lg:pl-[100px] flex-shrink-0">
            <img src={logo5} alt="header logo" className="w-[60px] sm:w-[70px] md:w-[80px]" />
          </a>

          {/* header menu */}
          <div className={`${header ? "" : "gap-6 text-white"} w-full lg:w-auto`}> 
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-tertiary text-base sm:text-lg md:text-xl uppercase tracking-[1.5px] lg:gap-x-8 overflow-x-auto">
              <a href="/" className="transition hover:text-accent px-2 py-1">Home</a>
              <a href="/rooms" className="transition hover:text-accent px-2 py-1">Rooms</a>
              <a href="/restaurants" className="transition hover:text-accent px-2 py-1">Restaurants</a>
              <a href="/contact" className="transition hover:text-accent px-2 py-1">Contact</a>
              <a href="/about" className="transition hover:text-accent px-2 py-1">About</a>
            </ul>
          </div>
          <div className="button flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-white w-full sm:w-auto mt-2 lg:mt-0 lg:mr-[100px]">
            {isAuthenticated() ? (
              <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
