import EventCard from "@/components/EventCard";

async function getEvents() {
  try {
    const res = await fetch(`https://pashe-achi-backend.vercel.app/api/events`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const data = await getEvents();
  const events = Array.isArray(data) ? data : data.events || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming events</h1>
        <p className="text-gray-500 text-sm mt-1">
          Only events that haven’t happened yet.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No events found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}