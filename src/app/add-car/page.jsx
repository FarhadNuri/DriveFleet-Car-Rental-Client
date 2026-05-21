'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
const AVAILABILITY_OPTIONS = ['Available', 'Not Available'];

export default function AddCar() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    carName: '',
    dailyRentPrice: '',
    carType: 'SUV',
    imageUrl: '',
    seatCapacity: '',
    pickupLocation: '',
    description: '',
    availabilityStatus: 'Available',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          dailyRentPrice: Number(form.dailyRentPrice),
          seatCapacity: Number(form.seatCapacity),
          bookingCount: 0,
        }),
      });

      if (res.ok) {
        toast.success('Car added successfully!');
        setForm({
          carName: '',
          dailyRentPrice: '',
          carType: 'SUV',
          imageUrl: '',
          seatCapacity: '',
          pickupLocation: '',
          description: '',
          availabilityStatus: 'Available',
        });
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to add car.');
      }
    } catch {
      toast.error('Something went wrong.');
    }

    setLoading(false);
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] bg-white';
  const labelClass = 'block text-sm font-medium text-[#1a1a2e] mb-1';

  return (
    <PrivateRoute>
      <section className="bg-[#f8f9fa] py-16 px-4">
        <div className="max-w-xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-[#1a1a2e] mb-6 font-[Syne] tracking-tight"
          >
            Add a New Car
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
           
            <div>
              <label className={labelClass}>Car Name</label>
              <input
                type="text"
                name="carName"
                value={form.carName}
                onChange={handleChange}
                required
                placeholder="e.g. Toyota Camry"
                className={inputClass}
              />
            </div>

           
            <div>
              <label className={labelClass}>Daily Rent Price ($)</label>
              <input
                type="number"
                name="dailyRentPrice"
                value={form.dailyRentPrice}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g. 50"
                className={inputClass}
              />
            </div>

           
            <div>
              <label className={labelClass}>Car Type</label>
              <select
                name="carType"
                value={form.carType}
                onChange={handleChange}
                className={inputClass}
              >
                {CAR_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/car.jpg"
                className={inputClass}
              />
            </div>

            
            <div>
              <label className={labelClass}>Seat Capacity</label>
              <input
                type="number"
                name="seatCapacity"
                value={form.seatCapacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g. 5"
                className={inputClass}
              />
            </div>

            
            <div>
              <label className={labelClass}>Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                required
                placeholder="e.g. Panchlaish, Chattogram"
                className={inputClass}
              />
            </div>

            
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of the car..."
                className={`${inputClass} resize-none`}
              />
            </div>

            
            <div>
              <label className={labelClass}>Availability Status</label>
              <select
                name="availabilityStatus"
                value={form.availabilityStatus}
                onChange={handleChange}
                className={inputClass}
              >
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#c1121f] transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Car'}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </PrivateRoute>
  );
}
