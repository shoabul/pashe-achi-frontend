import React from 'react';

const features = [
  {
    title: 'Post an event in minutes',
    description: 'Add a title, place, date and a photo. It shows up for everyone straight away.',
  },
  {
    title: 'Join with one click',
    description: 'Sign in, press Join Event, and it lands in your Joined Events list.',
  },
  {
    title: 'Stay in control',
    description: 'Edit or delete the events you created. Nobody else can change them.',
  },
  {
    title: "Only what's ahead",
    description: 'Past events drop off the public list, so you never sign up for something finished.',
  },
];

export default function FeaturesSection() {
  return (
    <section className=" px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to organise a drive
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            No spreadsheets, no group-chat chaos.
          </p>
        </div>


        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-l-2 border-[#175239] pl-4 flex flex-col justify-start"
            >
              <h3 className="text-base font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}