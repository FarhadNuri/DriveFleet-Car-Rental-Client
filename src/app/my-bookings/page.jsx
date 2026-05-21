'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyBookings() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/bookings/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, token]);

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/bookings/${cancelId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Booking cancelled.' });
        setBookings(bookings.filter((b) => b._id !== cancelId));
        setCancelId(null);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Cancel failed.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    }
    setActionLoading(false);
  };

  return (
    <PrivateRoute>
      <section className="bg-[#f8f9fa] py-16 px-4 min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-[#1a1a2e] mb-6 font-[Syne] tracking-tight"
          >
            My Bookings
          </motion.h1>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-[#10b981]'
                  : 'bg-red-50 text-[#ef4444]'
              }`}
            >
              {message.text}
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              You have no bookings yet.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="overflow-x-auto"
            >
              <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8f9fa]">
                    <th className="text-left px-4 py-3 font-medium text-[#1a1a2e]">Car</th>
                    <th className="text-left px-4 py-3 font-medium text-[#1a1a2e]">Price</th>
                    <th className="text-left px-4 py-3 font-medium text-[#1a1a2e]">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-[#1a1a2e]">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-[#1a1a2e]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-[#1a1a2e]">{booking.carName || 'N/A'}</td>
                      <td className="px-4 py-3 text-gray-600">${booking.dailyRentPrice || 'N/A'}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {booking.bookedAt
                          ? new Date(booking.bookedAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-100 text-[#10b981]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setCancelId(booking._id)}
                          className="text-sm text-[#e63946] font-medium hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>

      
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6 text-center"
          >
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-2 font-[Syne]">Cancel Booking?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 border border-[#1a1a2e] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                No
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={handleCancel}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {actionLoading ? 'Cancelling...' : 'Yes, Cancel'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </PrivateRoute>
  );
}
