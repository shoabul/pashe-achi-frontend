'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, } from 'lucide-react';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');

    return (
        <nav className="w-full bg-[#E5EBE7] px-6 py-3 border-b border-gray-200/50">
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
                        href="/upcoming-events"
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


                    <button className="bg-[#046A4E] hover:bg-[#03543e] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
                        Login
                    </button>
                </div>

            </div>
        </nav>
    );
}