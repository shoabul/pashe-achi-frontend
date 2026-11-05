import Hero from '@/components/Hero';
import RecentUpcomingEvents from '@/components/RecentUpcomingEvents';
import FeaturesSection from '@/components/FeaturesSection';
import { Feather } from 'lucide-react';
import PastEvents from '@/components/PastEvents';
import Newsletter from '@/components/Newsletter';
import { Suspense } from 'react';


async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    return [];
  }
}

async function HomeContent() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <RecentUpcomingEvents events={events} />
      <FeaturesSection />
      <PastEvents />
      <Newsletter />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}