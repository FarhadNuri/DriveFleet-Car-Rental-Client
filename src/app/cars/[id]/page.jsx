'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import BookingModal from '@/components/BookingModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { authClient } from '@/lib/auth-client';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CarDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { user, token } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

const handleBook = async ({ carId, driverNeeded, specialNote }) => {
  if (!user) {
    router.push(`/login?redirect=${encodeURIComponent(`/cars/${id}`)}`);
    return;
  }

  setBookingLoading(true);
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        carId, 
        driverNeeded, 
        specialNote,
        carName: car.carName,
        dailyRentPrice: car.dailyRentPrice,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({ type: 'success', text: 'Booking confirmed!' });
      setShowModal(false);
      const carRes = await fetch(`${API_URL}/cars/${id}`);
      const carData = await carRes.json();
      setCar(carData);
    } else {
      setMessage({ type: 'error', text: data.message || 'Booking failed.' });
    }
  } catch {
    setMessage({ type: 'error', text: 'Something went wrong.' });
  }
  setBookingLoading(false);
};

  if (loading) return <LoadingSpinner />;
  if (!car) return <p className="text-center py-20 text-gray-500">Car not found.</p>;

  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <section className="bg-[#f8f9fa] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative w-full h-64 md:h-full min-h-[300px] bg-gray-100">
            <Image
              src={car.imageUrl ||  'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={car.carName}
              fill
              className="object-cover"
              unoptimized
              key={car.imageUrl}
            />
          </div>

          
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Syne] tracking-tight">{car.carName}</h1>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  isAvailable
                    ? 'bg-green-100 text-[#10b981]'
                    : 'bg-red-100 text-[#ef4444]'
                }`}
              >
                {car.availabilityStatus}
              </span>
            </div>

            <p className="text-3xl font-bold text-[#e63946] mt-3">
              ${car.dailyRentPrice}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#1a1a2e] w-24">Type:</span>
                {car.carType}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-[#1a1a2e] w-20">Seats:</span>
                {car.seatCapacity}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-[#1a1a2e] w-20">Pickup:</span>
                {car.pickupLocation}
              </div>
            </div>

            {car.description && (
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                {car.description}
              </p>
            )}

            
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-[#10b981]'
                    : 'bg-red-50 text-[#ef4444]'
                }`}
              >
                {message.text}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                if (!user) {
                  router.push(`/login?redirect=${encodeURIComponent(`/cars/${id}`)}`);
                  return;
                }
                setShowModal(true);
              }}
              disabled={!isAvailable}
              className="mt-6 w-full py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#c1121f] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isAvailable ? 'Book Now' : 'Not Available'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      
      {showModal && (
        <BookingModal
          car={car}
          onClose={() => setShowModal(false)}
          onBook={handleBook}
          loading={bookingLoading}
        />
      )}
    </section>
  );
}
