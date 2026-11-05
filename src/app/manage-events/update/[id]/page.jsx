'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function UpdateEventPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        eventType: 'Education',
        eventDate: '',
        location: '',
        thumbnailUrl: '',
        description: '',
    });


    useEffect(() => {
        if (!eventId) return;

        fetch(`http://localhost:8000/api/events/${eventId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setFormData({
                        title: data.title || '',
                        eventType: data.category || 'Education',
                        eventDate: data.date ? data.date.split('T')[0] : '',
                        location: data.location || '',
                        thumbnailUrl: data.thumbnailUrl || '',
                        description: data.description || '',
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch event:', err);
                setError('Failed to load event data.');
                setLoading(false);
            });
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');


        let userId = localStorage.getItem('userId');

        if (!userId) {
            try {
                const sessionData = localStorage.getItem('better-auth.session');
                if (sessionData) {
                    const parsed = JSON.parse(sessionData);
                    userId = parsed?.user?.id || parsed?.user?.email || parsed?.userId;
                }
            } catch (err) {
                console.error('Error parsing session', err);
            }
        }


        if (!userId) {

            userId = formData.createdBy || '';
        }

        try {
            const res = await fetch(`http://localhost:8000/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || 'guest', // Backend verifyAuth ke pass korar jonno
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to update event');
            }

            router.push('/events');
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading event data...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 relative">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Update event</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event type
                            </label>
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            >
                                <option value="Cleanup">Cleanup</option>
                                <option value="Plantation">Plantation</option>
                                <option value="Donation">Donation</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event date
                            </label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail image URL
                        </label>
                        <input
                            type="url"
                            name="thumbnailUrl"
                            value={formData.thumbnailUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-[#0d5c3c] hover:bg-[#094830] text-white font-medium rounded-md transition-colors"
                    >
                        {submitting ? 'Saving changes...' : 'Save changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}