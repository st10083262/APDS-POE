// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminDashboard from './components/AdminDashboard';
import { LogOut } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // 'user' or 'admin'

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userToken, userRole) => {
    setToken(userToken);
    setRole(userRole);
    setIsAuthenticated(true);

    // Save token and role to localStorage
    localStorage.setItem('token', userToken);
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);

    // Remove token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <div className="App relative min-h-screen bg-black flex flex-col">
        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            {/* Homepage Route */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to={role === 'admin' ? '/admin' : '/user-home'} />
                ) : (
                  <Register />
                )
              }
            />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                isAuthenticated && role === 'admin' ? (
                  <AdminDashboard token={token} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* User Route */}
            <Route
              path="/user-home"
              element={
                isAuthenticated && role === 'user' ? (
                  <UserHome token={token} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Logout Button at the Bottom */}
        {isAuthenticated && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
