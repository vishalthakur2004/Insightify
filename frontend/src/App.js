import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Dashboard from './components/Dashboard';
import Getstart from './Pages/Getstart';
import Report from './Pages/Report';
import Demo from './Pages/Demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/getstart" element={<Getstart/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/demo" element={<Demo/>} />
      </Routes>
    </Router>
  );
}

export default App;
