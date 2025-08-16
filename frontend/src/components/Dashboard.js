import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function Dashboard() {
  const [lectures, setLectures] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [view, setView] = useState("list");
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  // Search filters
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  const fetchLectures = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/getlecture`);
      const lecturesData = response.data.lectures;
      setLectures(lecturesData);
      setFilteredLectures(lecturesData);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, dateFilter, teacherFilter, timeFilter, lectures]);

  const applyFilters = () => {
    let results = [...lectures];

    // Apply combined search term filter (searches across subject and teacher)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(lecture =>
        (lecture.subject && lecture.subject.toLowerCase().includes(lowerSearchTerm)) ||
        (lecture.teacher && lecture.teacher.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Apply specific teacher filter
    if (teacherFilter) {
      const lowerTeacherFilter = teacherFilter.toLowerCase();
      results = results.filter(lecture =>
        lecture.teacher && lecture.teacher.toLowerCase().includes(lowerTeacherFilter)
      );
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0); // Start of day

      results = results.filter(lecture => {
        if (!lecture.dateTime) return false;
        const lectureDate = new Date(lecture.dateTime);
        lectureDate.setHours(0, 0, 0, 0); // Start of day
        return lectureDate.getTime() === filterDate.getTime();
      });
    }

    // Apply time filter
    if (timeFilter) {
      const [filterHour, filterMinute] = timeFilter.split(':').map(Number);

      results = results.filter(lecture => {
        if (!lecture.dateTime) return false;
        const lectureDate = new Date(lecture.dateTime);
        const lectureHour = lectureDate.getHours();
        const lectureMinute = lectureDate.getMinutes();

        // Simple time comparison - can be made more sophisticated with time ranges
        return lectureHour === filterHour && lectureMinute === filterMinute;
      });
    }

    setFilteredLectures(results);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter("");
    setTeacherFilter("");
    setTimeFilter("");
  };

  const handleView = async (lecture, type) => {
    setLoading(true);
    try {
      let url = "";
      if (type === "Full Lecture") url = `${process.env.REACT_APP_URL}/api/getfulllecture/${lecture._id}`;
      if (type === "Summary") url = `${process.env.REACT_APP_URL}/api/getsummarize/${lecture._id}`;
      if (type === "Questions") url = `${process.env.REACT_APP_URL}/api/getquestions/${lecture._id}`;

      const response = await axios.get(url);
      setDetails(response.data);
      setType(type);
      setSelectedLecture(lecture);
      setView(type);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get unique teachers for filter dropdown
  const uniqueTeachers = [...new Set(lectures.map(lecture => lecture.teacher).filter(Boolean))];

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-800 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">Lecture Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Access your recorded lectures, summaries, and practice questions
          </p>
        </div>

        {view === "list" ? (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="w-full md:w-1/3">
                  <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="Search by subject or teacher..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                >
                  {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button> */}

                <div className="ml-auto">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                    disabled={!searchTerm && !dateFilter && !teacherFilter && !timeFilter}
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={fetchLectures}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium ml-2"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <label htmlFor="teacherFilter" className="block text-sm font-medium text-gray-700 mb-1">
                      Teacher
                    </label>
                    <select
                      id="teacherFilter"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={teacherFilter}
                      onChange={(e) => setTeacherFilter(e.target.value)}
                    >
                      <option value="">All Teachers</option>
                      {uniqueTeachers.map(teacher => (
                        <option key={teacher} value={teacher}>{teacher}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="dateFilter"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="timeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                      Time (24hrs format)
                    </label>
                    <input
                      type="time"
                      id="timeFilter"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Lectures Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
                </div>
              ) : filteredLectures.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 text-lg mb-2">No lectures found</p>
                  <p className="text-gray-400 text-sm mb-4">
                    {searchTerm || dateFilter || teacherFilter || timeFilter ?
                      "Try adjusting your search filters" :
                      "No lectures are available"
                    }
                  </p>
                  {(searchTerm || dateFilter || teacherFilter || timeFilter) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition mr-2"
                    >
                      Clear Filters
                    </button>
                  )}
                  <button
                    onClick={fetchLectures}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Refresh
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-700 text-white">
                      <tr>
                        <th className="py-4 px-6 text-left">Subject</th>
                        <th className="py-4 px-6 text-left">Teacher</th>
                        <th className="py-4 px-6 text-left">Date</th>
                        <th className="py-4 px-6 text-left">Time</th>
                        <th className="py-4 px-6 text-left">Recording</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLectures.map((lecture, index) => (
                        <tr
                          key={lecture._id}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-indigo-50"} hover:bg-indigo-100 transition-colors`}
                        >
                          <td className="py-4 px-6 font-medium">{lecture.subject || "N/A"}</td>
                          <td className="py-4 px-6">{lecture.teacher || "N/A"}</td>
                          <td className="py-4 px-6">{formatDate(lecture.dateTime)}</td>
                          <td className="py-4 px-6">{formatTime(lecture.dateTime)}</td>
                          <td className="py-4 px-6">
                            {lecture.audioPath ? (
                              <a href={lecture.audioPath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Click Here</a>) : (
                              "N/A"
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap justify-center gap-2">
                              <button
                                className="px-3 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                                onClick={() => handleView(lecture, "Full Lecture")}
                              >
                                Full Lecture
                              </button>
                              <button
                                className="px-3 py-2 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors"
                                onClick={() => handleView(lecture, "Summary")}
                              >
                                Summary
                              </button>
                              <button
                                className="px-3 py-2 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                                onClick={() => handleView(lecture, "Questions")}
                              >
                                Questions
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-indigo-700 hover:text-indigo-900 transition-colors"
                    onClick={() => setView("list")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to lectures
                  </button>

                  <div className="flex gap-2">
                    {["Full Lecture", "Summary", "Questions"].map((viewType) => (
                      <button
                        key={viewType}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${type === viewType
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        onClick={() => {
                          if (type !== viewType && selectedLecture) {
                            handleView(selectedLecture, viewType);
                          }
                        }}
                      >
                        {viewType}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-1">
                    {selectedLecture?.subject || "Lecture"} - {type}
                  </h2>
                  <p className="text-gray-600">
                    {selectedLecture?.teacher ? `by ${selectedLecture.teacher}` : ""}
                    {selectedLecture?.dateTime ? ` • ${formatDate(selectedLecture.dateTime)} at ${formatTime(selectedLecture.dateTime)}` : ""}
                  </p>
                </div>

                <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
                  {details ? (
                    <div dangerouslySetInnerHTML={{ __html: details }} />
                  ) : (
                    <p className="text-gray-500 italic">No content available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;