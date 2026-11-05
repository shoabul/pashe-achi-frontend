import JoinedEventsList from '@/components/JoinedEventsList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';

async function getJoinedEvents(userId) {
  try {
    const cookieStore = await headers();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?participant=${userId}`, {
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
    console.error('Error fetching joined events:', error);
    return [];
  }
}

async function JoinedEventsContent() {
  await headers();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-gray-500 font-medium">
        Please sign in to view your joined events.
      </div>
    );
  }

  const joinedEvents = await getJoinedEvents(userId);

  return (
    <JoinedEventsList
      initialEvents={joinedEvents}
      userId={userId}
    />
  );
}

export default function JoinedEventsPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-gray-500 font-medium">Loading joined events...</div>}>
      <JoinedEventsContent />
    </Suspense>
  );
}