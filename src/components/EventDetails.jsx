'use client';
import React, { useState } from 'react';

const EventDetails = ({ event, currentUser }) => {
  if (!event) return <div className="text-center py-10">Loading...</div>;

  const {
    _id,
    category = 'Education',
    title = '',
    description = '',
    date = '',
    location = '',
    organiser = 'demo',
    createdBy = '',
    participants = [], 
  } = event;

  // 1. Check if current logged-in user created this event
  const userId = currentUser?._id || currentUser?.id;
  const isCreatedByMe = userId && (createdBy === userId || createdBy === currentUser?.email);

  // 2. Check if user already joined (participants array check)
  const initialHasJoined = userId && participants.includes(userId);

  const [isJoined, setIsJoined] = useState(initialHasJoined);
  const [participantList, setParticipantList] = useState(participants);
  const [loading, setLoading] = useState(false);

  const image = event.thumbnailUrl || event.image || event.imageUrl || event.photo || event.banner;

  const formattedDate = (() => {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return date;
      return parsedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return date;
    }
  })();

  // 3. Correct Join / Leave Handler with x-user-id header
const handleJoinEvent = async () => {
    const userId = currentUser?._id || currentUser?.id;

    if (!currentUser || !userId) {
      alert("Please login first!");
      return;
    }

    if (isCreatedByMe) {
      alert("Creator cannot join their own event.");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${_id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': String(userId),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      if (data.joined) {
        setIsJoined(true);
        setParticipantList((prev) => [...prev, userId]);
      } else {
        setIsJoined(false);
        setParticipantList((prev) => prev.filter((id) => id !== userId));
      }
    } catch (error) {
      console.error('Error joining event:', error);
      alert(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image, Title & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden bg-[#804f14] flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
              {category}
            </span>

            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-36 bg-[#e6bf74] rounded-l-xl transform -skew-y-3 shadow-inner"></div>
                  <div className="w-32 h-36 bg-[#e6bf74] rounded-r-xl transform skew-y-3 shadow-inner"></div>
                </div>
                <div className="absolute top-6 right-16 w-20 h-20 bg-[#f9aa33] rounded-full"></div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>

        {/* Right Column: Sidebar Info Card */}
        <div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <p className="text-xs text-gray-400 font-medium">Date</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{formattedDate}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium">Location</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{location}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium">Organiser</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{organiser}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium">Volunteers</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">
                {participantList.length} joined
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleJoinEvent}
                disabled={isCreatedByMe || loading}
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isCreatedByMe
                    ? 'bg-[#71b199] text-white cursor-default'
                    : isJoined
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]'
                } ${loading ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loading
                  ? 'Processing...'
                  : isCreatedByMe
                  ? 'You created this event'
                  : isJoined
                  ? 'Leave Event'
                  : 'Join Event'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;