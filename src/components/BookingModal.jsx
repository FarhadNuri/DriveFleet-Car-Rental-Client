import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingModal({ car, onClose, onBook, loading }) {
  const [driverNeeded, setDriverNeeded] = useState('no');
  const [specialNote, setSpecialNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({
      carId: car._id,
      driverNeeded: driverNeeded === 'yes',
      specialNote,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 p-6"
      >
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-1 font-[Syne]">Book This Car</h2>
        <p className="text-sm text-gray-500 mb-5">
          {car.carName} - ${car.dailyRentPrice}/day
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
              Driver Needed?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverNeeded"
                  value="yes"
                  checked={driverNeeded === 'yes'}
                  onChange={(e) => setDriverNeeded(e.target.value)}
                  className="accent-[#e63946]"
                />
                <span className="text-sm text-[#1a1a2e]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverNeeded"
                  value="no"
                  checked={driverNeeded === 'no'}
                  onChange={(e) => setDriverNeeded(e.target.value)}
                  className="accent-[#e63946]"
                />
                <span className="text-sm text-[#1a1a2e]">No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Special Note
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Any special requests..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] bg-white resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 py-2.5 border border-[#1a1a2e] text-[#1a1a2e] rounded-lg text-sm font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              type="submit"
              disabled={loading}
              className="cursor-pointer flex-1 py-2.5 bg-[#e63946] text-white rounded-lg text-sm font-medium hover:bg-[#c1121f] transition-colors disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
