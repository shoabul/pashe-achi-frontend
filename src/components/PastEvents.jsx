import Image from 'next/image';
import React from 'react';

const eventsData = [
  {
    id: 1,
    title: 'Hatirjheel plantation',
    imageUrl: 'https://via.placeholder.com/400x300/1e7e34/ffffff?text=Hatirjheel+plantation',
  },
  {
    id: 2,
    title: 'Blanket drive, Mohammadpur',
    imageUrl: 'https://via.placeholder.com/400x300/9b3939/ffffff?text=Blanket+drive',
  },
  {
    id: 3,
    title: 'Lakeside cleanup, Dhanmondi',
    imageUrl: 'https://via.placeholder.com/400x300/0f766e/ffffff?text=Lakeside+cleanup',
  },
  {
    id: 4,
    title: 'Footpath class, Shahbag',
    imageUrl: 'https://via.placeholder.com/400x300/85581a/ffffff?text=Footpath+class',
  },
  {
    id: 5,
    title: 'Eye camp, Mymensingh',
    imageUrl: 'https://via.placeholder.com/400x300/1d5298/ffffff?text=Eye+camp',
  },
  {
    id: 6,
    title: 'Winter clothes, Mirpur 10',
    imageUrl: 'https://via.placeholder.com/400x300/9b3939/ffffff?text=Winter+clothes',
  },
];

const PastEvents = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">From our past drives</h2>
        <p className="text-sm text-gray-600 mt-1">A few moments from the last two winters.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-56 w-full overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 font-medium">{event.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastEvents;