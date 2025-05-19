import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, MessageCircleHeart, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-pink-600 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-md">
              <HeartPulse className="text-red-600 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to HealthBot</h1>
          <p className="text-lg mb-6">
            Your AI-powered personal health assistant. Ask questions, get instant answers, and make informed decisions — anytime, anywhere.
          </p>
          <Link
            to="/chat" 
            className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Start Chatting
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">Why Choose HealthBot?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <MessageCircleHeart className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Instant Health Answers</h3>
              <p className="text-sm text-gray-600">
                Get quick responses to your health questions — from symptoms to wellness tips.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Your data stays safe. We respect your privacy and don’t store personal health information.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <HeartPulse className="w-10 h-10 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
              <p className="text-sm text-gray-600">
                Access help any time of day — no appointments, no waiting rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Health Care. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
