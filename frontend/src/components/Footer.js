import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaHeadphones } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and copyright section */}
          <div className="flex items-center space-x-2">
            <FaHeadphones className="text-2xl text-purple-300" />
            <p className="text-sm md:text-base">
              &copy; {new Date().getFullYear()} Insightify. All rights reserved.
            </p>
          </div>

          {/* Audio wave decoration */}
          <div className="hidden md:flex items-center space-x-1">
            {[1, 2, 3, 4, 5, 3, 2].map((height, index) => (
              <div 
                key={index}
                className="bg-purple-300 rounded-full w-1"
                style={{ 
                  height: `${height * 4}px`,
                  animation: 'pulse 1.5s infinite',
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>

          {/* Social media icons */}
          <div className="flex space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/abhinav_sharma0080?igsh=Y2RwZHVoamFtdjJ1&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors duration-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinavsharma0080/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
