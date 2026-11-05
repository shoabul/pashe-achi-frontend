'use client';

import { useState, useEffect } from 'react';
import ManageEventsCard from '@/components/ManageEventsCard';
import { useSession } from '@/lib/auth-client';

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();
  const currentUserId = session?.user?.id;

  useEffect(() => {

    if (isPending) return;


    if (!currentUserId) {
      setLoading(false);
      return;
    }

    fetchUserEvents();
  }, [currentUserId, isPending]);

  const fetchUserEvents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?createdBy=${currentUserId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': currentUserId,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        alert(data.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  return (
    <ManageEventsCard
      events={events}
      loading={loading}
      onDelete={handleDelete}
    />
  );
}