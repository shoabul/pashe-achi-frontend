import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const categoryStyles = {
  Education: { bg: "bg-[#7A5416]" },
  Cleanup: { bg: "bg-[#006A71]" },
  Donation: { bg: "bg-[#9A3B3B]" },
  Plantation: { bg: "bg-[#1E7D46]" },
  Health: { bg: "bg-[#1D549F]" },
};

export default function EventCard({ event }) {
  const { _id, title, location, category, thumbnailUrl, date } = event || {};
  const style = categoryStyles[category] || categoryStyles.Cleanup;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No Date";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className={`relative h-48 w-full ${style.bg} flex items-center justify-center overflow-hidden`}>
        <span className="absolute top-4 left-4 bg-white text-gray-900 font-medium text-xs px-3 py-1 rounded-full shadow-sm z-10">
          {category || "General"}
        </span>

        <div className="absolute top-4 right-4 w-9 h-9 bg-[#F4B436] rounded-full z-10" />

        {thumbnailUrl && thumbnailUrl !== "https://google.com" ? (
          <Image
            src={thumbnailUrl}
            alt={title || "Event Image"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-16 h-20 bg-[#93E5DB] rounded-2xl border-4 border-[#65C4B7] opacity-90" />
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <p className="text-[#006A71] font-semibold text-sm mb-1">
            {formattedDate}
          </p>
          <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 leading-snug">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div>
          <Link
            href={`/events/${_id}`}
            className="inline-block bg-[#006A71] hover:bg-[#004D53] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}