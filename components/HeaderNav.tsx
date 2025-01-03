'use client';

import { Bookmark, Heart, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function HeaderNav() {
    const pathname = usePathname();
    const menu = [
        {
            name: 'Browse',
            link: '/',
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: 'Favorites',
            link: '/favorites',
            icon: <Heart size={22} />,
        },
        {
            name: 'Saved',
            link: '/bookmarks',
            icon: <Bookmark size={22} />,
        },
    ];
    return (
        <nav>
            <ul className='hidden md:flex items-center gap-8 text-gray-400'>
                {menu.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.link}
                            className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg ${
                                pathname === item.link
                                    ? 'bg-purple/15 text-purple'
                                    : ''
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
