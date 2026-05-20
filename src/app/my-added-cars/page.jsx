'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
const AVAILABILITY_OPTIONS = ['Available', 'Not Available'];

export default function MyAddedCars() {
  const { user, token } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchCars = () => {
    if (!user?.id) return;
    fetch(`${API_URL}/my-cars/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.id) fetchCars();
  }, [user, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/cars/${editCar._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editCar),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Car updated!' });
        setEditCar(null);
        fetchCars();
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Update failed.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/cars/${deleteCar._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Car deleted.' });
        setDeleteCar(null);
        fetchCars();
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Delete failed.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    }
    setActionLoading(false);
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] bg-white';
  const labelClass = 'block text-sm font-medium text-[#1a1a2e] mb-1';

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
            My Added Cars
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
          ) : cars.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              You haven&apos;t added any cars yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, i) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="relative w-full h-40 bg-gray-100">
                    <Image
                      src={car.image || 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={car.carName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1a1a2e]">{car.carName}</h3>
                    <p className="text-sm text-gray-500">{car.carType} - <span className="text-[#e63946] font-bold">${car.dailyRentPrice}</span>/day</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {car.availabilityStatus}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setEditCar({ ...car })}
                        className="flex-1 py-2 text-sm font-medium border border-[#1a1a2e] text-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e] hover:text-white transition-colors"
                      >
                        Update
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setDeleteCar(car)}
                        className="flex-1 py-2 text-sm font-medium text-[#ef4444] border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      
      {editCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-4 font-[Syne]">Update Car</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className={labelClass}>Daily Rent Price ($)</label>
                <input
                  type="number"
                  value={editCar.dailyRentPrice}
                  onChange={(e) =>
                    setEditCar({ ...editCar, dailyRentPrice: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={editCar.description || ''}
                  onChange={(e) =>
                    setEditCar({ ...editCar, description: e.target.value })
                  }
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass}>Availability</label>
                <select
                  value={editCar.availabilityStatus}
                  onChange={(e) =>
                    setEditCar({ ...editCar, availabilityStatus: e.target.value })
                  }
                  className={inputClass}
                >
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="url"
                  value={editCar.image || ''}
                  onChange={(e) =>
                    setEditCar({ ...editCar, image: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Car Type</label>
                <select
                  value={editCar.carType}
                  onChange={(e) =>
                    setEditCar({ ...editCar, carType: e.target.value })
                  }
                  className={inputClass}
                >
                  {CAR_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Pickup Location</label>
                <input
                  type="text"
                  value={editCar.pickupLocation || ''}
                  onChange={(e) =>
                    setEditCar({ ...editCar, pickupLocation: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  type="button"
                  onClick={() => setEditCar(null)}
                  className="flex-1 py-2.5 border border-[#1a1a2e] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-2.5 bg-[#e63946] text-white rounded-lg text-sm font-medium hover:bg-[#c1121f] disabled:opacity-50 transition-colors"
                >
                  {actionLoading ? 'Saving...' : 'Save'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      
      {deleteCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6 text-center"
          >
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-2 font-[Syne]">Delete Car?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete &quot;{deleteCar.carName}&quot;? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setDeleteCar(null)}
                className="flex-1 py-2.5 border border-[#1a1a2e] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={handleDelete}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </PrivateRoute>
  );
}
