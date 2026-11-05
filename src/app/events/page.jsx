"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


 useEffect(() => {
    async function fetchEvents() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
       
        const res = await fetch(`${baseUrl}/events`);
        const data = await res.json();
        
        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming events</h1>
        <p className="text-gray-500 text-sm mt-1">
          Only events that haven’t happened yet.
        </p>
      </div>


      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006A71]"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#006A71]"
          >
            <option value="All">All types</option>
            <option value="Education">Education</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Donation">Donation</option>
            <option value="Plantation">Plantation</option>
            <option value="Health">Health</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-500">Loading events...</div>
      )}

      {/* Events Grid */}
      {!loading && filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12 text-gray-500">
            No events found matching your criteria.
          </div>
        )
      )}
    </div>
  );
}