'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        
        if (result?.error) {
            alert('Login failed. Please check your credentials.');
        } else {
            router.push('/');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fade-in-up">
                <h2 className="text-3xl font-bold text-center text-black mb-8 animate-slide-in-down">
                    Login
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="text-black peer w-full px-4 py-3 rounded-lg border border-black focus:border-black focus:outline-none bg-transparent transition-all"
                            required
                            autoComplete="email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-3 text-gray-700 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-valid:-top-4 peer-valid:text-black peer-valid:text-sm px-1 bg-white"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="text-black peer w-full px-4 py-3 rounded-lg border border-black focus:border-black focus:outline-none bg-transparent transition-all"
                            required
                            autoComplete="current-password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-4 top-3 text-gray-700 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-valid:-top-4 peer-valid:text-black peer-valid:text-sm px-1 bg-white"
                        >
                            Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition-colors duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => signIn("google")}
                        className="px-4 py-2 rounded-lg border border-black text-black bg-white hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        Sign in with Google
                    </button>
                </div>
                <div>
                    <p className="mt-4 text-center text-gray-700">
                        Don't have an account? <a href="/register" className="text-black underline hover:text-gray-700">Register</a>
                    </p>
                </div>
            </div>
            <style jsx>{`
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .animate-slide-in-down {
                    animation: slideInDown 0.7s cubic-bezier(0.23, 1, 0.32, 1);
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Page;
