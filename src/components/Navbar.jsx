'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client'; 

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#E5EBE7]/95 backdrop-blur-md px-6 py-3 border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center space-x-3">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                            Pashe Achi
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        onClick={() => setActiveTab('Home')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'Home'
                            ? 'bg-[#D3E1D9] text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/events"
                        onClick={() => setActiveTab('Upcoming Events')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'Upcoming Events'
                            ? 'bg-[#D3E1D9] text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Upcoming Events
                    </Link>
                </div>

                <div className="flex items-center space-x-3">

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 text-gray-700 bg-white/70 hover:bg-white rounded-lg border border-gray-300/60 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {isPending ? (
                        <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
                    ) : user ? (
                        <div className="flex items-center gap-3 relative">
                            {/* Profile Image / Avatar container */}
                            <div 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="cursor-pointer"
                                title={user.name || 'Profile'}
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        width={36}
                                        height={36}
                                        className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-[#046A4E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                    <Link
                                        href="/create-event"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Create Event
                                    </Link>
                                    <Link
                                        href="/manage-events"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Manage Events
                                    </Link>
                                    <Link
                                        href="/joined-events"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Joined Events
                                    </Link>
                                </div>
                            )}

                            <button
                                onClick={handleSignOut}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/60 rounded-lg transition-colors"
                                title="Sign Out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/sign-in"
                            onClick={() => setActiveTab('Sign In')}
                        >
                            <button className="bg-[#046A4E] hover:bg-[#03543e] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}