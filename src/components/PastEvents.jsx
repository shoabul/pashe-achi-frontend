import Image from 'next/image';
import React from 'react';

const eventsData = [
  {
    id: 1,
    title: 'Hatirjheel plantation',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Blanket drive, Mohammadpur',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Lakeside cleanup, Dhanmondi',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Footpath class, Shahbag',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Eye camp, Mymensingh',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Winter clothes, Mirpur 10',
    imageUrl: 'https://old.bidyanondo.org/uploads/projects/12/Winter-Clothes-Distribution-small-1704364188.jpg',
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
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
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