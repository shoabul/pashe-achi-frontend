import EventDetails from '@/components/EventDetails';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getEventData(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching event details:', error);
    return null;
  }
}

async function EventContent({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUser = session?.user;

  // ইউজার লগইন না থাকলে /sign-in পেজে রিডাইরেক্ট হবে
  if (!currentUser) {
    redirect('/sign-in?error=Please%20sign%20in%20to%20view%20event%20details.');
  }

  const event = await getEventData(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Event not found or failed to load.
      </div>
    );
  }

  return (
    <main className="bg-[#f8faf9] py-10">
      <EventDetails event={event} currentUser={currentUser} />
    </main>
  );
}

export default function EventPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <EventContent params={params} />
    </Suspense>
  );
}