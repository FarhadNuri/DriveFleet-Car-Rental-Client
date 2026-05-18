'use client';

import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();

const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());
    console.log(registerData);

    const { data, error } = await signUp.email({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        image: registerData.image || undefined,
    })

    if (error) {
        toast.error(error.message || "Registration failed")
        return;
    }

    toast.success("Account created successfully!")
    router.push("/")
}

    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">

                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Join <span className="text-blue-600">Driver Fleet</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Create your account to get started</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-6">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="name"
                                        required
                                        placeholder="Enter your name"
                                        type="text"
                                        name="name"
                                        className="border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 focus:outline-none transition-all duration-300 h-14 bg-white w-full rounded-2xl pl-10 pr-4"
                                    />
                                </div>
                            </div>

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

                            {/* Profile Image URL */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="text-sm font-bold text-slate-700 ml-1">
                                    Profile Image URL
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="image"
                                        placeholder="https://example.com/photo.jpg"
                                        type="url"
                                        name="image"
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

                            <button
                                type="submit"
                                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 bg-blue-600 text-white flex items-center justify-center gap-2 group hover:bg-blue-700 transition-colors"
                            >
                                Create Account <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                        </form>

                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 font-medium">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}