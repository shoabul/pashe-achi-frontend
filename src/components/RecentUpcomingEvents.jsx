import EventCard from './EventCard';

export default function RecentUpcomingEvents({ events = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Recent upcoming events
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          The six events happening soonest, added by people like you.
        </p>
      </div>


      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}