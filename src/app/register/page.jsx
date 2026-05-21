'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) {
      errors.push('Must have at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Must have at least one lowercase letter');
    }
    if (password.length < 6) {
      errors.push('Must be at least 6 characters long');
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const errors = validatePassword(e.target.value);
    setPasswordErrors(errors);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const image = formData.get('image');
    const password = formData.get('password');

    
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setError('Please fix the password requirements below.');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await signUp.email({
      name,
      email,
      password,
      image: image || undefined,
    });

    if (authError) {
      setError(authError.message || 'Registration failed. Please try again.');
      setLoading(false);
      return;
    }

    router.push('/login');
  };

  const handleGoogleLogin = async () => {
    await signUp.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] bg-white';

  return (
    <section className="bg-[#f8f9fa] py-16 px-4 min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1 font-[Syne] tracking-tight">Register</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your DriveFllet account
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-[#ef4444]">
            {error}
          </div>
        )}

        
        <motion.button
          whileHover={{ scale: 1.03 }}
          type="button"
          onClick={handleGoogleLogin}
          className="cursor-pointer w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={18}
            height={18}
          />
          Sign up with Google
        </motion.button>

        
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400 font-medium">or with email</span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Photo URL
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Create a password"
                onChange={handlePasswordChange}
                className={inputClass}
              />
            </div>
            
            {passwordErrors.length > 0 && (
              <ul className="mt-2 space-y-1">
                {passwordErrors.map((err, i) => (
                  <li key={i} className="text-xs text-[#ef4444]">
                    {err}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#c1121f] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-[#e63946] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
