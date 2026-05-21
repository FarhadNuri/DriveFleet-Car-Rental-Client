import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="bg-[#f8f9fa] py-20 px-4 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#e63946] mb-4 font-[Syne]">404</h1>
        <p className="text-xl font-semibold text-[#1a1a2e] mb-2">
          Oops! Page not found
        </p>
        <p className="text-sm text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#c1121f] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
