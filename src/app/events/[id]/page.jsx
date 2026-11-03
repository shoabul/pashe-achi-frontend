import EventDetails from '@/components/EventDetails';

// API Fetching Function
async function getEventData(id) {
  try {
    const res = await fetch(`http://localhost:8000/api/events/${id}`, {
      cache: 'no-store', // dynamic data fetch
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

export default async function EventPage({ params }) {
  const { id } = await params; // Next.js 15+ compatible
  const event = await getEventData(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Event not found or failed to load.
      </div>
    );
  }

  return (
    <main className=" bg-[#f8faf9] py-10">
      <EventDetails event={event} />
    </main>
  );
}