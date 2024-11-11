// src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { getPendingPayments, approvePayment, rejectPayment } from '../api';
import api from '../api';

const AdminDashboard = ({ token }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [adminForm, setAdminForm] = useState({ name: '', surname: '', email: '', password: '', idNumber: '' });
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => {
    fetchPendingPayments();
  }, [token]);

  const fetchPendingPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPendingPayments(token);
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch pending payments:', error);
      setError('Failed to fetch pending payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setError(null);
    setMessage(null);
    setProcessing(id);
    try {
      await approvePayment(token, id);
      setMessage('Payment approved successfully.');
      fetchPendingPayments();
    } catch (error) {
      console.error('Failed to approve payment:', error);
      setError(error.response?.data.message || 'Failed to approve payment. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    setError(null);
    setMessage(null);
    setProcessing(id);
    try {
      await rejectPayment(token, id);
      setMessage('Payment rejected successfully.');
      fetchPendingPayments();
    } catch (error) {
      console.error('Failed to reject payment:', error);
      setError(error.response?.data.message || 'Failed to reject payment. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddingAdmin(true);
    setError(null);
    setMessage(null);

    try {
      await api.post(
        '/api/admin/add-admin',
        adminForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('New admin added successfully.');
      setAdminForm({ name: '', surname: '', email: '', password: '', idNumber: '' });
    } catch (error) {
      console.error('Failed to add admin:', error);
      setError(error.response?.data.message || 'Failed to add admin. Please try again.');
    } finally {
      setAddingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto bg-black rounded-2xl shadow-lg border border-gray-800">
        {/* Header */}
        <div className="p-6 rounded-t-2xl bg-gradient-to-r from-red-600 to-red-800">
          <h2 className="text-4xl font-extrabold text-white text-center">Admin Dashboard</h2>
          <p className="text-white text-center mt-2">Manage Pending Payments & Add Admins</p>
        </div>

        {/* Notifications */}
        {message && (
          <div className="bg-green-500 text-white p-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-4 text-center">
            {error}
          </div>
        )}

        {/* Pending Payments */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader className="animate-spin text-red-500 w-12 h-12" />
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Pending Payments</h3>
              {payments.length === 0 ? (
                <p className="text-gray-400 text-center">No pending payments at the moment.</p>
              ) : (
                <ul className="space-y-4">
                  {payments.map((payment) => (
                    <li key={payment._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
                      <div>
                        <p className="text-lg font-medium text-white">
                          <strong>From:</strong> {payment.sender?.name || 'Unknown'} ({payment.sender?.email || 'N/A'})
                        </p>
                        <p className="text-lg font-medium text-white">
                          <strong>To:</strong> {payment.recipient?.name || 'Unknown'} ({payment.recipient?.email || 'N/A'})
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Amount: R{payment.amount} | SWIFT Code: {payment.swiftCode}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(payment._id)}
                          className={`flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 ${processing === payment._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={processing === payment._id}
                        >
                          {processing === payment._id ? (
                            <Loader size={18} className="animate-spin mr-2" />
                          ) : (
                            <CheckCircle size={18} className="mr-2" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(payment._id)}
                          className={`flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ${processing === payment._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={processing === payment._id}
                        >
                          {processing === payment._id ? (
                            <Loader size={18} className="animate-spin mr-2" />
                          ) : (
                            <XCircle size={18} className="mr-2" />
                          )}
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Add Admin Section */}
        <div className="p-6 bg-gray-900 rounded-b-2xl">
          <h3 className="text-2xl font-semibold text-white mb-6">Add New Admin</h3>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Surname"
              value={adminForm.surname}
              onChange={(e) => setAdminForm({ ...adminForm, surname: e.target.value })}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="ID Number"
              value={adminForm.idNumber}
              onChange={(e) => setAdminForm({ ...adminForm, idNumber: e.target.value })}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={addingAdmin}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-600 focus:outline-none"
            >
              {addingAdmin ? <Loader className="animate-spin mx-auto" /> : 'Add Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
