// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-red-500 opacity-30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white opacity-20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 left-40 w-60 h-60 bg-red-700 opacity-25 rounded-full filter blur-3xl animate-float-reverse"></div>
        {/* Additional decorative elements */}
        <div className="absolute top-40 left-20 w-40 h-40 bg-red-600 opacity-40 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-60 h-60 bg-white opacity-30 rounded-full filter blur-2xl animate-spin-slow"></div>
      </div>

      {/* Welcome Section */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl text-center max-w-lg mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-5xl font-extrabold text-red-700 mb-6 tracking-tight leading-tight gradient-text">
          Secure Payments Portal
        </h1>
        <p className="text-lg text-white mb-8 leading-relaxed">
          Efficiently manage your transactions and financial insights.
        </p>
        <Link
          to="/login"
          className="inline-block bg-red-500 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg"
        >
          Login to Your Account
        </Link>
        {/* Additional call-to-action button */}
        <Link
          to="/register"
          className="inline-block bg-gray-800 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg mt-4"
        >
          Create an Account
        </Link>
      </div>

      {/* Credits Section */}
      <footer className="mt-16 text-white text-sm text-center relative z-10 font-medium">
        Made by <span className="text-red-600">Kaitlyn</span>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(5px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-pulse { animation: pulse 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(to right, #ff3737, #ff6969);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Home;