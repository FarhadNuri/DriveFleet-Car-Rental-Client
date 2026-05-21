import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CarCard({ car }) {
  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
    >

      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={car.imageUrl || 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={car.carName}
          fill
          className="object-cover"
          unoptimized
          key={car.imageUrl}
        />

        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
            isAvailable
              ? 'bg-green-100 text-[#10b981]'
              : 'bg-red-100 text-[#ef4444]'
          }`}
        >
          {isAvailable ? 'Available' : 'Not Available'}
        </span>
      </div>


      <div className="px-4 py-3 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#1a1a2e]">{car.carName}</h3>
        <p className="text-sm text-gray-500 mt-1">{car.carType}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-[#e63946]">
            ${car.dailyRentPrice}
            <span className="text-sm font-normal text-gray-500">/day</span>
          </span>
          <span className="text-sm text-gray-500">{car.seatCapacity} seats</span>
        </div>

        <Link
          href={`/cars/${car._id}`}
          className="mt-3 block w-full text-center py-2 border border-[#1a1a2e] text-[#1a1a2e] text-sm font-medium rounded-lg hover:bg-[#1a1a2e] hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
