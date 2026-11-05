'use client';

import React, { useEffect, useState } from 'react';
import JoinedEventsList from '@/components/JoinedEventsList';
import { authClient } from '@/lib/auth-client';

const JoinedEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      setLoading(false);
      setJoinedEvents([]);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/events?participant=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch joined events');
        const data = await res.json();
        setJoinedEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [userId, isPending]);

  const handleLeaveEvent = async (eventId) => {
    if (!userId) return;
    
    try {
      const res = await fetch(`${API_URL}/events/${eventId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
      });

      const data = await res.json();

      if (res.ok && data.joined === false) {
        setJoinedEvents((prev) => prev.filter((event) => event._id !== eventId));
      } else {
        alert(data.error || 'Failed to leave event.');
      }
    } catch (err) {
      console.error('Error leaving event:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isPending || loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-gray-500 font-medium">
        Loading joined events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <JoinedEventsList
      joinedEvents={joinedEvents}
      onLeaveEvent={handleLeaveEvent}
      formatDate={formatDate}
    />
  );
};

export default JoinedEventsPage;