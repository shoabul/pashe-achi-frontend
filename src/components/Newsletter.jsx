'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="w-full py-12 px-4 sm:px-6 flex justify-center items-center">
      <div className="w-full max-w-7xl bg-[#006847] rounded-2xl p-8 md:p-10 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get the weekend list
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base font-normal">
            One short email every Thursday with drives near you.
          </p>
        </div>


        <form 
          onSubmit={handleSubmit} 
          className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full sm:w-80 px-4 py-3 rounded-lg text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm font-medium"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-3 bg-[#0d1f19] hover:bg-[#152e25] text-white font-semibold text-sm rounded-lg transition-colors duration-200 whitespace-nowrap disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

      </div>
    </section>
  );
}