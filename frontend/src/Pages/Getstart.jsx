import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Getstart = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    teacherName: '',
    dateTime: new Date().toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup audio URL when component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        
        // Create URL for audio playback
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      // Reset and start timer
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check your device settings.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setIsRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];
    setRecordingDuration(0);
  };

  const saveToDevice = () => {
    if (!audioBlob) return;
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `lecture-recording-${new Date().toISOString().slice(0, 10)}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openUploadForm = () => {
    setShowForm(true);
  };

  const handleUpload = async () => {
    if (!audioBlob) return;

    const formDataToSend = new FormData();
    formDataToSend.append("audio_data", audioBlob, "recording.wav");
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("teacherName", formData.teacherName);
    formDataToSend.append("dateTime", formData.dateTime);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/upload/audio`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      const audioId = response.data.audio._id;
      const audioURL = `${process.env.REACT_APP_URL}/upload/audio/${audioId}`;
      console.log("Audio can be accessed at:", audioURL);

      setShowForm(false);
      resetRecording();
      toast.success("Redirecting...");
      const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
      await delay();

      navigate("/report", { state: { audio: audioURL, tname: formData.teacherName, sub: formData.subject, datetime: formData.dateTime } });

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed... Try again");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white">
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto px-4 pt-8 pb-20">
        <h1 className='font-bold text-3xl text-center p-6 mb-8'>
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Record Your Lecture
          </span>
        </h1>
        
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white border-opacity-20">
            <div className="flex flex-col items-center mb-8">
              {/* Recording waveform visualization (static for design) */}
              <div className={`w-full h-16 mb-6 flex items-center justify-center ${!isRecording && !audioUrl ? 'opacity-30' : ''}`}>
                {isRecording ? (
                  <div className="w-full flex items-center justify-center space-x-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-red-500 rounded-full animate-pulse" 
                        style={{ 
                          height: `${Math.max(15, Math.floor(Math.random() * 40))}px`,
                          animationDelay: `${i * 0.05}s`
                        }} 
                      />
                    ))}
                  </div>
                ) : audioUrl ? (
                  <div className="w-full flex items-center justify-center space-x-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-blue-500 rounded-full" 
                        style={{ height: `${Math.max(5, Math.floor(Math.random() * 30))}px` }} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center space-x-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-gray-400 rounded-full" 
                        style={{ height: '5px' }} 
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Timer display */}
              <div className="text-2xl font-mono mb-6 bg-black bg-opacity-30 px-4 py-2 rounded-lg">
                {formatTime(recordingDuration)}
              </div>
              
              {/* Main record button */}
              <button
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isRecording 
                    ? 'bg-red-600 animate-pulse hover:bg-red-700' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                } mb-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isPlaying}
              >
                {isRecording ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
              
              {isRecording && (
                <div className="text-sm text-red-300 animate-pulse mb-4">
                  Recording in progress...
                </div>
              )}
              
              {audioUrl && (
                <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
              )}
              
              {/* Audio controls */}
              <div className="flex space-x-4 mt-2">
                {audioUrl && (
                  <>
                    <button
                      onClick={togglePlayPause}
                      className="px-4 py-2 rounded-full flex items-center bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
                      disabled={isRecording}
                    >
                      {isPlaying ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Pause
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Play
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetRecording}
                      className="px-4 py-2 rounded-full flex items-center bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md"
                      disabled={isRecording}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Reset
                    </button>
                    <button
                      onClick={saveToDevice}
                      className="px-4 py-2 rounded-full flex items-center bg-green-500 hover:bg-green-600 transition-colors shadow-md"
                      disabled={isRecording}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {audioBlob && !isRecording && (
              <div className="flex justify-center">
                <button
                  onClick={openUploadForm}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload Lecture
                </button>
              </div>
            )}
            
            {/* Recording tips */}
            {!audioBlob && !isRecording && (
              <div className="mt-8 bg-black bg-opacity-20 p-4 rounded-lg text-sm">
                <h3 className="font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Recording Tips
                </h3>
                <ul className="space-y-1 list-disc pl-5 text-blue-100">
                  <li>Ensure you're in a quiet environment</li>
                  <li>Speak clearly at a consistent volume</li>
                  <li>Keep the microphone at a consistent distance</li>
                  <li>Test your microphone before recording your lecture</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl p-6 w-full max-w-md border border-indigo-400 border-opacity-30 shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Lecture Details
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-blue-200 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-indigo-900 bg-opacity-50 border border-indigo-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-200 mb-2">Teacher's Name</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-indigo-900 bg-opacity-50 border border-indigo-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-200 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-indigo-900 bg-opacity-50 border border-indigo-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-md"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Getstart;