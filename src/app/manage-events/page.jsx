'use client';

import { useState, useEffect } from 'react';
import ManageEventsCard from '@/components/ManageEventsCard';
import { useSession } from '@/lib/auth-client';

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  useEffect(() => {
    if (currentUserId) {
      fetchUserEvents();
    }
  }, [currentUserId]);

  const fetchUserEvents = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/events?createdBy=${currentUserId}`);
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
      const res = await fetch(`http://localhost:8000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': currentUserId,
        },
      });

      if (res.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
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