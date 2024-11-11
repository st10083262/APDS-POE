// src/components/Register.js

import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIdNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,13}$/.test(value)) {
      setIdNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!name || !surname || !idNumber || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/register', { 
        name, 
        surname, 
        idNumber, 
        email, 
        password 
      });
      setMessage('Registration successful!');
      console.log('Registered:', response.data);
    } catch (error) {
      setError(error.response?.data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-red-500 opacity-30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white opacity-20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 left-40 w-60 h-60 bg-red-700 opacity-25 rounded-full filter blur-3xl animate-float-reverse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">✨</span>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-2 gradient-text">
            Create Account
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Join us to access exclusive features
          </p>

          {error && (
            <div className="bg-red-500 text-white p-4 mb-6 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}
          {message && (
            <div className="bg-green-500 text-white p-4 mb-6 rounded-md">
              <p className="text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">First Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="surname" className="block text-sm font-medium text-gray-300">Last Name</label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-300">ID Number</label>
              <input
                type="text"
                id="idNumber"
                value={idNumber}
                onChange={handleIdNumberChange}
                placeholder="Enter your ID number"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
                maxLength="13"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-red-400 font-medium hover:text-red-500 hover:underline transition-colors duration-200">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
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
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
          .gradient-text {
            background: linear-gradient(to right, #ff3737, #ff6969);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
