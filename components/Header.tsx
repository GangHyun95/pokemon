'use client';
import { Bookmark, Heart, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
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
        <header className='min-h-[10vh] px-16 py-6 w-full bg-white flex justify-between items-center shadow-sm'>
            <Link href='/'>
                <Image
                    src={'/pokemon--logo.png'}
                    width={120}
                    height={90}
                    alt='logo'
                />
            </Link>
            <nav>
                <ul className='flex items-center gap-8 text-gray-400'>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.link}
                                className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg ${
                                    pathname === item.link
                                        ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
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
            <div className='flex items-center gap-4'>
                <Link
                    href='/api/auth/login'
                    className='py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out'
                >
                    <LogIn size={20} />
                    Login
                </Link>
                <Link
                    href='/api/auth/login'
                    className='py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7] text-white hover:bg-[#6c5ce7]/90 transition-all duration-300 ease-in-out'
                >
                    <UserPlus size={20} />
                    Register
                </Link>
            </div>
        </header>
    );
}
