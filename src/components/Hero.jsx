import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-[#0a231c]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/hero-image.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a231c]/60 to-[#0a231c]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center">
                <span className="text-[#e29949] font-medium text-lg md:text-xl tracking-wide mb-4">
                    পাশে আছি
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                    Your neighbourhood <br className="hidden md:block" />
                    needs hands this week.
                </h1>

                <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
                    Find a clothes drive, cleanup or reading class near you, sign up in one click, and turn up. Or start one yourself.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
  {/* Primary Action Button */}
  <Link
    href="/events"
    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#e29949] hover:bg-[#d68b3d] text-gray-900 font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-[#e29949]/20 active:scale-[0.98] text-center"
  >
    Browse upcoming events
  </Link>

  {/* Secondary Action Button */}
  <Link
    href="/create-event"
    className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-white/20 hover:border-white/60 text-white font-medium text-base bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 active:scale-[0.98] text-center"
  >
    Create an event
  </Link>
</div>

                <div className="flex items-center justify-center gap-12 text-left">
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="text-3xl md:text-4xl font-bold text-white mb-1">8</span>
                        <span className="text-xs md:text-sm text-gray-300 font-light">events coming up</span>
                    </div>

                    <div className="h-10 w-[1px] bg-white/20" />

                    <div className="flex flex-col items-center sm:items-start">
                        <span className="text-3xl md:text-4xl font-bold text-white mb-1">0</span>
                        <span className="text-xs md:text-sm text-gray-300 font-light">volunteers signed up</span>
                    </div>
                </div>
            </div>
        </section>
    );
}