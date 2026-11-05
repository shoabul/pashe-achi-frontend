import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JoinedEventsList = ({ joinedEvents = [], onLeaveEvent, formatDate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 ">

      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Joined events
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Events you signed up for, soonest first.
        </p>
      </div>


      {joinedEvents.length === 0 ? (
        <div className="w-full border border-dashed border-gray-300 rounded-2xl bg-[#f8faf9] py-16 px-4 text-center flex flex-col items-center justify-center">
          <p className="text-gray-600 text-base sm:text-lg mb-5 font-medium">
            You haven’t joined any events yet.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center justify-center bg-[#006644] hover:bg-[#005237] text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Find an event
          </Link>
        </div>
      ) : (

        <div className="space-y-4">
          {joinedEvents.map((event) => (
            <div
              key={event._id}
              className="w-full bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Event Image & Details */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <Image
                    src={event.thumbnailUrl || '/placeholder-event.png'}
                    alt={event.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {formatDate(event.date)} • {event.location || 'Location N/A'} • {event.participants?.length || 0} joined
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row items-center justify-end space-x-2.5 self-end sm:self-center flex-shrink-0">
                <Link
                  href={`/events/${event._id}`}
                  className="inline-flex items-center justify-center px-3.5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm rounded-lg transition-colors duration-150 bg-white shadow-sm whitespace-nowrap"
                >
                  View event
                </Link>

                <button
                  onClick={() => onLeaveEvent(event._id)}
                  className="inline-flex items-center justify-center px-3.5 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-medium text-xs sm:text-sm rounded-lg transition-colors duration-150 shadow-sm whitespace-nowrap"
                >
                  Leave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEventsList;