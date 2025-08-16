import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaLinkedin, FaInstagram, FaPhone, FaHeadphones,FaEnvelope, FaMusic, FaCode } from "react-icons/fa";

const DevTeamCard = ({ name, branch, linkedin, instagram, phone, pic, email  }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-80 border-l-4 border-purple-600 relative">
      {/* Header section with name and role */}
      <div className="flex items-start mb-4">
        {/* Profile image */}
        <div className="mr-4">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-purple-200">
            <img
              src={pic}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Name and title */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-900">{name}</h2>
          <h3 className="text-sm text-indigo-700">{branch}</h3>
          
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-purple-200 to-indigo-100 my-3"></div>
    
      
      {/* Contact information */}
      <div className="bg-purple-50 rounded-md p-3 mb-4">
        <h4 className="text-sm font-medium text-purple-800 mb-2">Contact Info</h4>
        <div className="flex items-center mb-2">
          <FaPhone className="text-purple-500 mr-2 text-xs" />
          <span className="text-xs text-gray-700">{phone}</span>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-purple-500 mr-2 text-xs" />
          <span className="text-xs text-gray-700">{email}</span>
        </div>
      </div>
      
      {/* Social links footer */}
      <div className="flex justify-between mt-auto pt-2">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-indigo-100 text-indigo-600 py-2 rounded-l-md"
        >
          <FaLinkedin className="text-lg" />
        </a>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-purple-100 text-purple-600 py-2"
        >
          <FaInstagram className="text-lg" />
        </a>
       
      </div>
    </div>
  );
};


const About = () => {
  const teamMembers = [
    // {
    //   name: "Abhinav Sharma",
    //   branch: "BTech CSE'26",
    //   linkedin: "https://www.linkedin.com/in/abhinavsharma0080/",
    //   instagram: "https://www.instagram.com/abhinav_sharma0080/",
    //   phone: "+91 6283130835",
    //   pic: "/abhinav.jpg",
    //   email:"abhinavs.cs.22@nitj.ac.in",
    // },
    {
      name: "Harman Paul",
      branch: "BTech CSE'26",
      linkedin: "https://www.linkedin.com/in/harman-paul-3b63ab144",
      instagram: "https://www.instagram.com/harman_.paul/",
      phone: "+91 6284733341",
      pic: "/harman.jpg",
      email:"harmanp.cs.22@nitj.ac.in",
    },
    {
      name: "Yash Prajapati",
      branch: "BTech CSE'26",
      linkedin: "https://www.linkedin.com/in/yashp0212/",
      instagram: "https://www.instagram.com/_yashp_212/",
      phone: "+91 7983970792",
      pic: "/yash.jpg",
      email:"yashp.cs.22@nitj.ac.in",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      <Header />

      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <FaCode className="text-4xl text-purple-800" />
          </div>

          <h1 className="text-4xl font-bold text-purple-900 mb-3">The Voices Behind Insightify</h1>

          <div className="flex justify-center space-x-1 mb-6">
            {[3, 5, 7, 9, 11, 9, 7, 5, 3].map((height, index) => (
              <div
                key={index}
                className="bg-purple-700 rounded-full w-1"
                style={{
                  height: `${height}px`,
                  animation: 'pulse 1.5s infinite ease-in-out',
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>

          <p className="text-lg max-w-2xl mx-auto text-indigo-800">
            Meet our talented development team who composed Insightify,
            blending code and audio to create an immersive experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <DevTeamCard key={index} {...member} />
          ))}
        </div>

        
      </div>

      <Footer />
    </div>
  );
};

export default About;