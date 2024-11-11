import React, { useState } from 'react';
import api from '../api';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      const role = response.data.user.role;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Trigger onLogin function passed down from the parent
      onLogin(token, role);
    } catch (error) {
      setError(error.response?.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-white to-red-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <FaLock className="text-white text-4xl" />
          </div>

          <h2 className="text-3xl font-bold text-center text-red-700 mb-2">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-8">Please login to access your account</p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700" aria-label="Email Address">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                  autoFocus
                  aria-describedby="email-helper"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700" aria-label="Password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                  aria-describedby="password-helper"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-lg
                hover:from-red-500 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-red-600 font-medium hover:text-red-700 hover:underline transition-colors duration-200"
              >
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-red-300 opacity-30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white opacity-20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 left-40 w-60 h-60 bg-red-500 opacity-25 rounded-full filter blur-3xl animate-float-reverse"></div>
      </div>
    </div>
  );
};

export default Login;
