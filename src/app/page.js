import Hero from '@/components/Hero';
import RecentUpcomingEvents from '@/components/RecentUpcomingEvents';
import FeaturesSection from '@/components/FeaturesSection';
import { Feather } from 'lucide-react';
import PastEvents from '@/components/PastEvents';
import Newsletter from '@/components/Newsletter';


async function getEvents() {
  try {
    const res = await fetch('http://localhost:8000/api/events/', {
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

export default async function HomePage() {
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