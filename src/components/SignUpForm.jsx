'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; // Adjust path based on your setup

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: image || undefined,
        },
        {
          onSuccess: () => {
            router.push('/'); // Redirect after successful registration
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Something went wrong during registration.');
          },
        }
      );
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: '/', // Redirect after successful sign-in
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message || 'Something went wrong with Google sign up.');
            setGoogleLoading(false);
          },
        }
      );
    } catch (err) {
      setError('An unexpected error occurred with Google sign up.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
        Create your account
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        It takes under a minute.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Google Sign Up Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors duration-200 shadow-sm disabled:opacity-50 mb-6"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.22 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-2.55z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
      </button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-200 w-full"></div>
        <span className="absolute bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
          Or with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="name" 
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E]"
          />
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E]"
          />
        </div>

        <div>
          <label 
            htmlFor="image" 
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Photo URL
          </label>
          <input
            id="image"
            type="url"
            placeholder="https://"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E]"
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E]"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            At least 6 characters, with one uppercase and one lowercase letter.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 px-4 bg-[#006A4E] hover:bg-[#00553e] text-white font-medium rounded-lg text-sm transition-colors duration-200 shadow-sm disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        Already registered?{' '}
        <Link href="/sign-in" className="text-[#006A4E] font-medium hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}