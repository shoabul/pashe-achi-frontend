import Link from 'next/link';
import { FaHeart, FaXTwitter, FaFacebookF } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-[#03251d] text-emerald-100/70 py-12 text-sm font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#f59e0b] text-[#03251d] p-1.5 rounded-lg flex items-center justify-center">
                <FaHeart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-white text-lg font-bold tracking-wide">
                Pashe Achi
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-emerald-100/70 max-w-xs">
              A volunteer-run platform for neighbourhood service drives across Bangladesh.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md border border-emerald-800/80 hover:border-emerald-600 flex items-center justify-center text-emerald-200 transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-md border border-emerald-800/80 hover:border-emerald-600 flex items-center justify-center text-emerald-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-white transition-colors">
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4">Account</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-white transition-colors">
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4">Contact</h4>
            <div className="space-y-2 text-xs leading-relaxed text-emerald-100/70">
              <p>House 12, Road 4, Mirpur 10</p>
              <p>Dhaka 1216</p>
              <p className="pt-1">
                <a href="mailto:hello@pasheachi.org" className="hover:text-white transition-colors">
                  hello@pasheachi.org
                </a>
              </p>
              <p>
                <a href="tel:+8801700000000" className="hover:text-white transition-colors">
                  +880 1700-000000
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Divider & Bottom Section */}
        <div className="border-t border-emerald-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <p>© 2026 Pashe Achi. Made for the community.</p>
          <div className="flex items-center gap-1">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}