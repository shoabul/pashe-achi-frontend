import ManageEventsCard from '@/components/ManageEventsCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';

async function getUserEvents(userId) {
  try {
    const cookieStore = await headers();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?createdBy=${userId}`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieStore.get('cookie') || '',
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.events || [];
  } catch (error) {
    console.error('Error fetching user events:', error);
    return [];
  }
}

async function ManageEventsContent() {
  await headers();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Please sign in to manage your events.
      </div>
    );
  }

  const events = await getUserEvents(currentUserId);

  return (
    <ManageEventsCard
      initialEvents={events}
      currentUserId={currentUserId}
    />
  );
}

export default function ManageEventsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Loading your events...</div>}>
      <ManageEventsContent />
    </Suspense>
  );
}