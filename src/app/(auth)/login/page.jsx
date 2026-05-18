'use client';

import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
// import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loginData = Object.fromEntries(formData.entries());
        console.log(loginData);

        // const { data, error } = await signIn.email({
        //     ...loginData,
        //     callbackURL: "/"
        // })
        // if (error) {
        //     toast.error("Login failed")
        //     return;
        // }
        // router.push("/")
    }

    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50">
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">

                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Welcome <span className="text-blue-600">Back</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Continue your journey today</p>
                        </div>

                        {/* Google Sign In */}
                        <div className="space-y-4">
                            <button
                                type="button"
                                className="w-full h-12 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
                            >
                                <img width={20} height={20} src="https://www.google.com/favicon.ico" alt="Google" />
                                Sign in with Google
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="email"
                                        required
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 focus:outline-none transition-all duration-300 h-14 bg-white w-full rounded-2xl pl-10 pr-4"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="password"
                                        required
                                        placeholder="••••••••"
                                        type="password"
                                        name="password"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 focus:outline-none transition-all duration-300 h-14 bg-white w-full rounded-2xl pl-10 pr-4"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link href="#" className="text-sm font-bold text-blue-600 hover:underline underline-offset-4">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 bg-blue-600 text-white flex items-center justify-center gap-2 group hover:bg-blue-700 transition-colors"
                            >
                                Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                        </form>

                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 font-medium">
                                New to Driver Fleet?{' '}
                                <Link href="/register" className="text-blue-600 font-black hover:underline underline-offset-4">
                                    Create an account
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}