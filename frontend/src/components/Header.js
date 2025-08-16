import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled ? "bg-purple-900" : "bg-gradient-to-r from-purple-800 to-indigo-900"} text-white shadow-lg transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo with audio icon */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
            </svg>
            <Link to="/" className="hover:text-purple-300 transition duration-300">
              Insightify
            </Link>
          </div>
        </div>

        {/* Navigation with sound wave animation effect */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            {[
              { to: "/", label: "Home" },
              { to: "/getstart", label: "Record" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/about", label: "Dev Team" },
              { to: "/contact", label: "Contact Us" }
            ].map((link) => (
              <li key={link.to} className="flex flex-col items-center">
                <Link
                  to={link.to}
                  className={`hover:text-purple-300 transition duration-300 flex items-center ${
                    location.pathname === link.to ? "text-purple-300 font-medium" : ""
                  }`}
                >
                  {link.label}
                </Link>
                {/* Sound wave animation for active link */}
                {location.pathname === link.to && (
                  <div className="flex space-x-1 mt-1">
                    <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
                    <div className="w-1 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                    <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;