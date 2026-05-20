'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import CarCard from '@/components/CarCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CAR_TYPES = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.carName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === 'All' || car.carType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <section className="bg-[#f8f9fa] py-16 px-4 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-[#1a1a2e] mb-4 font-[Syne] tracking-tight"
        >
          Explore Cars
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-gray-500 mb-8 max-w-xl"
        >
          Find the perfect car for your next trip.
        </motion.p>


        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by car name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] bg-white"
            />
          </div>


          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          >
            {CAR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>


        {loading ? (
          <LoadingSpinner />
        ) : filteredCars.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No cars found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, i) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
