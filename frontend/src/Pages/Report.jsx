import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  FileCheck, 
  HelpCircle, 
  Upload, 
  AlertTriangle,
  ExternalLink,
  RefreshCw
} from "lucide-react";

function Report() {
    const location = useLocation();
    const data = location.state || {};
    const dateTime = data.datetime ? new Date(data.datetime) : null;
    const navigate = useNavigate();

    const dummydata = `Data mining is the process of discovering patterns, trends, and insights from large datasets using techniques such as machine learning, statistical analysis, and artificial intelligence. It plays a crucial role in various industries, including finance, healthcare, marketing, and e-commerce, by enabling organizations to make data-driven decisions. `


    const [summary, setSummary] = useState("");
    const [relatedQuestions, setRelatedQuestions] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Fetch Summary
    useEffect(() => {
        const fetchSummary = async () => {
            setLoadingSummary(true);
            try {
                const response = await axios.post(`${process.env.REACT_APP_URL}/generate/summarize`, { text: dummydata });
                console.log("Summary Response:", response.data);
                setSummary(response.data.summary);
            } catch (error) {
                console.error("Error fetching summary:", error.response?.data || error.message);
                setSummary("Failed to fetch summary.");
            }
            setLoadingSummary(false);
        };

        fetchSummary();
    }, []);

    // Fetch Related Questions (after Summary is available)
    useEffect(() => {
        if (!summary || summary === "Failed to fetch summary.") return;

        const fetchQuestions = async () => {
            setLoadingQuestions(true);
            try {
                const response = await axios.post(`${process.env.REACT_APP_URL}/generate/generate-questions`, { summary });
                console.log("Questions Response:", response.data);
                setRelatedQuestions(response.data.questions);
            } catch (error) {
                console.error("Error fetching questions:", error.response?.data || error.message);
                setRelatedQuestions("Failed to fetch questions.");
            }
            setLoadingQuestions(false);
        };

        fetchQuestions();
    }, [summary]);

    const handleUpload = async () => {
        setShowPopup(false);
        setLoadingUpload(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/api/uploadlecture`, {
                subject: data.sub,
                teacher: data.tname,
                content: dummydata,
                summary: summary,
                question: relatedQuestions,
                dateTime: Date.now(),
                audioPath: data.audio
            });
            toast.success("Lecture uploaded successfully!");
            const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
            await delay();
            navigate("/dashboard");

        } catch (error) {
            toast.error("Error uploading lecture!");
            console.error("Error uploading lecture:", error);
        }
        setLoadingUpload(false);
    };

    const formatQuestions = (questions) => {
        if (!questions) return [];
        return questions.split("\n").filter(q => q.trim() !== "");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="bg-indigo-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white flex items-center">
                            <BookOpen className="mr-2" size={24} />
                            Lecture Report
                        </h1>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50">
                        <div className="flex items-center text-gray-700">
                            <User className="mr-2 text-indigo-600" size={20} />
                            <span className="font-medium">Delivered by:</span>
                            <span className="ml-2">{data.tname || "NA"}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                            <FileText className="mr-2 text-indigo-600" size={20} />
                            <span className="font-medium">Subject:</span>
                            <span className="ml-2">{data.sub || "NA"}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 text-indigo-600" size={20} />
                            <span className="font-medium">Date:</span>
                            <span className="ml-2">{dateTime ? dateTime.toLocaleDateString() : "NA"}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                            <Clock className="mr-2 text-indigo-600" size={20} />
                            <span className="font-medium">Time:</span>
                            <span className="ml-2">{dateTime ? dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "NA"}</span>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-white border-t border-gray-200">
                        <div className="flex items-center text-gray-700 mb-4">
                            <ExternalLink className="mr-2 text-indigo-600" size={20} />
                            <span className="font-medium">Your recorded lecture:</span>
                            <a 
                                href={data.audio} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ml-2 text-indigo-600 hover:text-indigo-800 underline flex items-center"
                            >
                                Listen to recording
                            </a>
                        </div>
                    </div>
                </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-emerald-600 px-6 py-3">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <FileText className="mr-2" size={20} />
                                Full Lecture Content
                            </h2>
                        </div>
                        <div className="p-6 bg-white">
                            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 min-h-48 max-h-96 overflow-y-auto">
                                <p className="text-gray-700 whitespace-pre-line">{dummydata}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-blue-600 px-6 py-3">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <FileCheck className="mr-2" size={20} />
                                Lecture Summary
                            </h2>
                        </div>
                        <div className="p-6 bg-white">
                            {loadingSummary ? (
                                <div className="flex items-center justify-center p-8 text-gray-500">
                                    <RefreshCw className="mr-2 animate-spin" size={20} />
                                    <p>Generating summary...</p>
                                </div>
                            ) : (
                                <div className="p-4 border border-gray-200 rounded-md bg-blue-50 min-h-48">
                                    <p className="text-gray-700">{summary}</p>
                                </div>
                            )}
                        </div>
                    </div>
               

                <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
                    <div className="bg-amber-600 px-6 py-3">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                            <HelpCircle className="mr-2" size={20} />
                            Related Questions
                        </h2>
                    </div>
                    <div className="p-6 bg-white">
                        {loadingQuestions ? (
                            <div className="flex items-center justify-center p-8 text-gray-500">
                                <RefreshCw className="mr-2 animate-spin" size={20} />
                                <p>Generating questions...</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {formatQuestions(relatedQuestions).map((question, index) => (
                                    <div key={index} className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                                        <p className="text-gray-700">{question}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors flex items-center"
                        onClick={() => setShowPopup(true)}
                    >
                        <Upload className="mr-2" size={20} />
                        Upload Lecture
                    </button>
                </div>

                <Toaster position="top-right" reverseOrder={false} />

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className="flex items-start mb-6">
                                <AlertTriangle className="text-amber-500 mr-3 flex-shrink-0" size={24} />
                                <div>
                                    <p className="text-lg font-semibold mb-1">Are you sure you want to upload this lecture?</p>
                                    <p className="text-gray-600 text-sm">This action cannot be undone later.</p>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                                    onClick={handleUpload}
                                    disabled={loadingUpload}
                                >
                                    {loadingUpload ? (
                                        <>
                                            <RefreshCw className="mr-2 animate-spin" size={16} />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2" size={16} />
                                            Upload
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Report;