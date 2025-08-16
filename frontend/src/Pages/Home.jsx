import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Learn Smarter, <span className="text-yellow-300">Not Harder</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Insightify transforms your lectures into actionable insights, summaries, and personalized learning paths.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/getstart" className="bg-white text-indigo-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1">
                Record Lecture
              </Link>
              <Link to="/dashboard" className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition duration-300 transform hover:-translate-y-1">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Image/Mockup */}
        <div className="container mx-auto mt-12 px-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-2xl mx-auto max-w-5xl">
            <img
              src="dashpic.png"
              alt="Insightify Dashboard Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">How Insightify Empowers Your Learning</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines AI-powered tools with intuitive analytics to transform your educational experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon="📝"
              title="Smart Lecture Summaries"
              description="Transform hours of lectures into concise, actionable summaries that capture the key concepts and learning objectives."
            />
            <FeatureCard
              icon="❓"
              title="Personalized Questions"
              description="Reinforce learning with AI-generated questions that adapt to your understanding and target knowledge gaps."
            />
            <FeatureCard
              icon="📊"
              title="Interactive Analytics"
              description="Visualize your learning journey with comprehensive dashboards that highlight strengths and areas for improvement."
            />
            <FeatureCard
              icon="🔄"
              title="Real-time Feedback"
              description="Rate lectures and receive immediate insights on your comprehension and engagement levels."
            />
            <FeatureCard
              icon="📱"
              title="Cross-platform Access"
              description="Access your learning materials and insights anywhere, on any device, with our responsive design."
            />
            <FeatureCard
              icon="🤝"
              title="Community Learning"
              description="Connect with peers studying similar subjects to share notes, summaries, and learning strategies."
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Information */}
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Analytics</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Track Your Academic Progress</h2>
              <p className="text-xl text-gray-700 mb-8">
                Our intuitive dashboard provides deep insights into your learning patterns, helping you optimize study time and maximize retention.
              </p>
              <div className="space-y-4">
                <BenefitItem text="Visualize engagement across all your courses" />
                <BenefitItem text="Identify knowledge gaps before they affect your performance" />
                <BenefitItem text="Set personalized learning goals with progress tracking" />
                <BenefitItem text="Receive AI-powered recommendations for study focus" />
              </div>
              <Link to="/analytics" className="inline-block mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
                Explore Analytics
              </Link>
            </div>
            
            {/* Graph */}
            <div className="bg-gray-100 p-10 rounded-2xl shadow-xl">
              <img
                src="https://www.researchgate.net/publication/326002906/figure/fig4/AS:672628050247694@1537378432892/Percentage-of-students-time-spent-demonstrating-different-classroom-activities.png"
                alt="Analytics Dashboard"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their learning experience with Insightify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Insightify has completely changed how I study. The lecture summaries save me hours of review time!"
              name="Abhinav Sharma"
              title="Computer Science"
            />
            <TestimonialCard
              quote="The personalized questions helped me identify gaps in my understanding that I didn't even know existed."
              name="Harman Paul"
              title="Computer Science"
            />
            <TestimonialCard
              quote="I used to struggle with lecture notes, but now I can focus on listening and let Insightify handle the summarization."
              name="Yash Prajapati"
              title="Computer Science"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of students who are already improving their academic performance with Insightify.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/getstart" className="bg-white text-indigo-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition duration-300">
              Start Your Free Trial
            </Link>
            <Link to="https://www.youtube.com/watch?v=loYuXgYDDIo" className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition duration-300">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

const FeatureCard = ({ icon, title, description}) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BenefitItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="bg-indigo-600 text-white p-1 rounded-full mt-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="text-lg">{text}</span>
  </div>
);

const TestimonialCard = ({ quote, name, title }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="text-indigo-600 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-gray-700 mb-6">{quote}</p>
    <div>
      <p className="font-bold text-gray-900">{name}</p>
      <p className="text-gray-600">{title}</p>
    </div>
  </div>
);

export default Home;