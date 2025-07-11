'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Registration failed')
            router.push('/login')
        } catch (error) {
            setError("Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white border border-neutral-200 shadow-lg rounded-xl p-10 w-full max-w-md flex flex-col items-center">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-black rounded-full p-3 mb-4 shadow">
                        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="#fff"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-black mb-1 tracking-tight">Create Account</h1>
                    <p className="text-neutral-500 text-center text-sm">Sign up to get started with VideoWithAI</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full rounded-md border border-neutral-300 px-4 py-2 bg-neutral-50 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full rounded-md border border-neutral-300 px-4 py-2 bg-neutral-50 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full rounded-md border border-neutral-300 px-4 py-2 bg-neutral-50 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 text-xs text-center">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-black text-white font-semibold text-base shadow hover:bg-neutral-900 transition-colors duration-200 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        )}
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-8 text-center text-neutral-600 text-sm">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-black font-semibold underline hover:text-neutral-800 transition"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Page
