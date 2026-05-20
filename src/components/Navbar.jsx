'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Car, Menu, X, User, LogOut, LayoutDashboard, CirclePlus as PlusCircle, BookmarkPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore-cars', label: 'Explore Cars' },
    { href: '/add-car', label: 'Add Car' },
    { href: '/my-bookings', label: 'My Bookings' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b border-gray-800 ${
        scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md shadow-sm' : 'bg-[#0a0a0f]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="flex items-center justify-center gap-2">
            <img src="/logowtext.png" alt="RentWheels" className="pt-2 h-50 object-contain align-middle" style={{ verticalAlign: 'middle' }} />
          </Link>

          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#e63946]'
                    : 'text-gray-300 hover:text-[#e63946]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={user.image || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-300 max-w-24 truncate">
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#1a1a2e] truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/add-car"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1a1a2e] hover:bg-gray-50"
                    >
                      <PlusCircle className="w-4 h-4" /> Add Car
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1a1a2e] hover:bg-gray-50"
                    >
                      <BookmarkPlus className="w-4 h-4" /> My Bookings
                    </Link>
                    <Link
                      href="/my-added-cars"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1a1a2e] hover:bg-gray-50"
                    >
                      <Car className="w-4 h-4" /> My Added Cars
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#e63946] hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#e63946] text-white text-sm font-medium rounded-lg hover:bg-[#c1121f] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0a0a0f] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(link.href)
                  ? 'bg-red-900/30 text-[#e63946]'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/my-added-cars"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10"
              >
                My Added Cars
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#e63946] hover:bg-red-900/30"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#e63946] hover:bg-red-900/30"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
