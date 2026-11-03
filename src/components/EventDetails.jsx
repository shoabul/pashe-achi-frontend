import React from 'react';

const EventDetails = ({ event }) => {
  if (!event) return <div className="text-center py-10">Loading...</div>;

  const {
    category = 'Education',
    title = 'Weekend Reading Class for Street Children',
    description = 'A two-hour Bangla and basic maths class on the Shahbag footpath. Bring story books or notebooks. Teaching experience is welcome but not required.',
    image,
    date = '3 Nov 2026',
    location = 'Shahbag, Dhaka',
    organiser = 'demo',
    volunteersCount = 0,
    isCreatedByMe = true,
  } = event;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Banner / Image Container */}
          <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden bg-[#804f14] flex items-center justify-center">
            {/* Category Badge */}
            <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
              {category}
            </span>

            {/* Custom Image / Fallback Mock Banner matching design */}
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Book Graphic Design */}
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-36 bg-[#e6bf74] rounded-l-xl transform -skew-y-3 shadow-inner"></div>
                  <div className="w-32 h-36 bg-[#e6bf74] rounded-r-xl transform skew-y-3 shadow-inner"></div>
                </div>
                {/* Sun Graphic */}
                <div className="absolute top-6 right-16 w-20 h-20 bg-[#f9aa33] rounded-full"></div>
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right Column: Sidebar Info Card */}
        <div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Date */}
            <div>
              <p className="text-xs text-gray-400 font-medium">Date</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{date}</p>
            </div>

            {/* Location */}
            <div>
              <p className="text-xs text-gray-400 font-medium">Location</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{location}</p>
            </div>

            {/* Organiser */}
            <div>
              <p className="text-xs text-gray-400 font-medium">Organiser</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{organiser}</p>
            </div>

            {/* Volunteers */}
            <div>
              <p className="text-xs text-gray-400 font-medium">Volunteers</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">
                {volunteersCount} joined
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                disabled={isCreatedByMe}
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isCreatedByMe
                    ? 'bg-[#71b199] text-white cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isCreatedByMe ? 'You created this event' : 'Join Event'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;