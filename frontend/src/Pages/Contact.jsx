import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaEnvelope, FaUser, FaCommentAlt, FaPaperPlane, FaHeadphones, FaMicrophone, FaVolumeUp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/contact/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-100 to-purple-50">
      <Header/>
      
      <div className="flex-grow py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <FaHeadphones className="text-5xl text-purple-800" />
              <div className="absolute -right-2 -top-2">
                <FaVolumeUp className="text-2xl text-indigo-600 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-semibold text-purple-900 mb-3">Get in Touch</h2>
          
          <div className="flex justify-center space-x-1 mb-6">
            {[3, 5, 7, 6, 8, 6, 5, 3].map((height, index) => (
              <div 
                key={index}
                className="bg-purple-600 rounded-full w-1"
                style={{ 
                  height: `${height}px`,
                  animation: 'pulse 1.5s infinite ease-in-out',
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          
          <p className="text-lg leading-8 text-indigo-800 mb-8 max-w-2xl mx-auto">
            We're always listening! Reach out with any questions or just say hello.
          </p>

          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-purple-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="flex items-center text-sm font-medium text-purple-800 mb-2">
                  <FaUser className="mr-2 text-indigo-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="flex items-center text-sm font-medium text-purple-800 mb-2">
                  <FaEnvelope className="mr-2 text-indigo-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="message" className="flex items-center text-sm font-medium text-purple-800 mb-2">
                  <FaCommentAlt className="mr-2 text-indigo-600" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-semibold rounded-md hover:from-purple-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-sm animate-bounce" />
              </button>
            </form>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-3 text-indigo-700">
              <FaMicrophone className="text-xl" />
              <p className="text-sm">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default Contact;