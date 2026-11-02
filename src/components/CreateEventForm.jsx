'use client';

import { useState } from 'react';
import { authClient } from "@/lib/auth-client";

export default function CreateEventForm() {

  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: '',
    eventType: 'Cleanup',
    eventDate: '',
    location: '',
    thumbnailUrl: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');


    if (!session?.user) {
      setError('Please sign in to create an event.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          'x-user-id': session.user.id || session.user.email,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      setSuccess('Event created successfully!');
      setFormData({
        title: '',
        eventType: 'Cleanup',
        eventDate: '',
        location: '',
        thumbnailUrl: '',
        description: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full p-6 sm:p-10">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Create an event
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Tell volunteers where to go and when.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Event title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Winter Clothes Distribution"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Event type
              </label>
              <div className="relative">
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all cursor-pointer"
                >
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Event date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all cursor-pointer"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Area, City"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Thumbnail image URL
            </label>
            <input
              type="url"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="What will volunteers do, and what should they bring?"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition-all resize-y"
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#00684a] hover:bg-[#00523a] active:bg-[#003d2b] disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors duration-200 shadow-sm"
            >
              {loading ? 'Creating event...' : 'Create event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}