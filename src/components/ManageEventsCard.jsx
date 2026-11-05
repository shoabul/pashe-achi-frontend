import Image from 'next/image';
import Link from 'next/link';

export default function ManageEvents({ events, loading, onDelete }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage events</h1>
          <p className="text-sm text-gray-500">
            Events you created. Only you can edit or delete them.
          </p>
        </div>
        <Link
          href="/create-event"
          className="bg-[#0b5c3b] hover:bg-[#094a2f] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          New event
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading your events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">You haven't created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-[#7c4d29] rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                  {event.thumbnailUrl ? (
                    <Image
                      src={event.thumbnailUrl}
                      alt={event.title}
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-amber-400 absolute top-2 right-2"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(event.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {event.location || 'Location not specified'} · 0 joined
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  href={`/manage-events/update/${event._id}`}
                  className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Update
                </Link>
                <button
                  onClick={() => onDelete(event._id)}
                  className="px-4 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}