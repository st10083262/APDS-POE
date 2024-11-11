// src/components/UserHome.js

import React, { useEffect, useState, useCallback } from 'react';
import {
  Home as HomeIcon,
  FileText,
  DollarSign,
  Menu,
  PieChart,
} from 'lucide-react';
import PaymentForm from './PaymentForm';
import VisualData from './VisualData';
import Statements from './Statements';
import { getBalanceAndTransactions } from '../api';

const UserHome = ({ token }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBalanceAndTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBalanceAndTransactions(token);
      setBalance(response.data.balance);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch balance and transactions:', error);
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserBalanceAndTransactions();
  }, [fetchUserBalanceAndTransactions]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <HomeIcon size={20} /> },
    { id: 'makePayment', label: 'Make a Payment', icon: <DollarSign size={20} /> },
    { id: 'visualData', label: 'Visual Data', icon: <PieChart size={20} /> },
    { id: 'statements', label: 'View Statements', icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <Menu size={24} className="md:hidden" onClick={() => setSelectedTab('menu')} />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Centered Navigation Tabs */}
        <nav className="mt-4 md:mt-0">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  selectedTab === tab.id ? 'bg-red-600' : 'hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {selectedTab === 'menu' && (
        <nav className="bg-gray-900 p-4 md:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                selectedTab === tab.id ? 'bg-red-600' : 'hover:bg-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      {/* Content Section */}
      <main className="flex-1 p-4 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {/* Overview Section */}
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balance Display */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Balance</p>
                      <p className="text-3xl font-bold text-white">
                        R{balance.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-red-600 p-3 rounded-full">
                      <DollarSign size={24} />
                    </div>
                  </div>
                </div>
                {/* Visual Data */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg md:col-span-2">
                  <VisualData transactions={transactions} />
                </div>
              </div>
            )}
            {/* Other Sections */}
            {selectedTab === 'makePayment' && (
              <PaymentForm
                token={token}
                onTransactionUpdate={fetchUserBalanceAndTransactions}
              />
            )}
            {selectedTab === 'visualData' && (
              <VisualData transactions={transactions} />
            )}
            {selectedTab === 'statements' && (
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <Statements transactions={transactions} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserHome;
