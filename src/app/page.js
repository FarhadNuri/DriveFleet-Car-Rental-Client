'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import CarCard from '@/components/CarCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/featured-cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative h-[70vh] md:min-h-screen flex items-center">
        <img
          src="/heroimg.png"
          alt="DriveFleet Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 px-4 sm:px-8 md:px-20 max-w-xl w-full"
        >

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#e63946] text-xs font-semibold uppercase tracking-widest mb-2 font-inter"
          >
            PREMIUM CAR RENTAL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-3"
          >
            Find Your Perfect{' '}
            <span className="text-[#e63946]">Ride.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg max-w-sm mb-6 leading-relaxed font-inter"
          >
            Browse our wide selection of cars at affordable daily rates. Book in minutes and hit the road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/explore-cars"
                className="bg-[#e63946] text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-sm hover:bg-[#c1121f] transition-all duration-300 inline-block"
              >
                Explore Cars
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-[#f8f9fa] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-[#1a1a2e] text-center mb-4 font-[Syne] tracking-tight"
          >
            Featured Cars
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-500 text-center mb-10 max-w-xl mx-auto"
          >
            Check out our top picks available for booking right now.
          </motion.p>

          {loading ? (
            <LoadingSpinner />
          ) : cars.length === 0 ? (
            <p className="text-center text-gray-500">No cars available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, i) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-[#1a1a2e] text-center mb-4 font-[Syne] tracking-tight"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-500 text-center mb-10 max-w-xl mx-auto"
          >
            We make car rental simple, safe, and affordable.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Wide Selection', desc: 'Choose from SUVs, sedans, hatchbacks and luxury cars.' },
              { icon: Shield, title: 'Safe & Insured', desc: 'All our cars are fully insured and regularly maintained.' },
              { icon: Clock, title: 'Quick Booking', desc: 'Book your ride in under 2 minutes, no hassle.' },
              { icon: MapPin, title: 'Easy Pickup', desc: 'Convenient pickup locations across the city.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#f8f9fa] rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#e63946]" />
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-[#1a1a2e] text-center mb-4 font-[Syne] tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-500 text-center mb-10 max-w-xl mx-auto"
          >
            Three simple steps to get on the road.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Browse Cars', desc: 'Search and filter to find the right car.' },
              { step: '2', title: 'Book Online', desc: 'Fill in your details and confirm booking.' },
              { step: '3', title: 'Pick Up & Drive', desc: 'Collect your car and enjoy the ride.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-[#e63946] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
