'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const { data, error: authError } = await signIn.email({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || 'Login failed. Please try again.');
      setLoading(false);
      return;
    }

    router.push(redirect);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: redirect,
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
        <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1 font-[Syne] tracking-tight">Login</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back to RentWheels
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
          className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={18}
            height={18}
          />
          Sign in with Google
        </motion.button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400 font-medium">or with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
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
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className={inputClass}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#c1121f] transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#e63946] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <section className="bg-[#f8f9fa] py-16 px-4 min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#e63946] rounded-full animate-spin"></div>
      </section>
    }>
      <LoginForm />
    </Suspense>
  );
}
