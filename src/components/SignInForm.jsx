'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ইউআরএল থেকে error কুয়েরি প্যারামিটার চেক করে টোস্ট শো করা
  useEffect(() => {
    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [searchParams]);

  // Email & Password Sign In Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success('Successfully logged in!');
            router.push('/');
          },
          onError: (ctx) => {
            const errorMsg = ctx.error.message || 'Invalid email or password.';
            setError(errorMsg);
            toast.error(errorMsg);
          },
        }
      );
    } catch (err) {
      const errorMsg = 'An unexpected error occurred during sign in.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: '/',
        },
        {
          onError: (ctx) => {
            const errorMsg = ctx.error.message || 'Something went wrong with Google sign in.';
            setError(errorMsg);
            toast.error(errorMsg);
            setGoogleLoading(false);
          },
        }
      );
    } catch (err) {
      const errorMsg = 'An unexpected error occurred with Google sign in.';
      setError(errorMsg);
      toast.error(errorMsg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
        Welcome back
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Log in to join and create events.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading || loading}
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
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E]"
          />
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full py-2.5 px-4 bg-[#006A4E] hover:bg-[#00553e] text-white font-medium rounded-lg text-sm transition-colors duration-200 shadow-sm disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600 flex items-center justify-between">
        <p>
          New here?{' '}
          <Link href="/sign-up" className="text-[#006A4E] font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}