import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from '@/components/Header';
import FetchUserDetails from '@/components/FetchUserDetails';

const notoSans = Noto_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Pokemon',
    description: 'PokeAPI를 활용한 포켓몬 도감 프로젝트.',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Pokemon',
        description: 'PokeAPI를 활용한 포켓몬 도감 프로젝트.',
        url: 'https://pokemon-mu-azure.vercel.app/',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
                    integrity='sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=='
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
            </head>
            <UserProvider>
                <body className={`${notoSans.className} antialiased`}>
                    <FetchUserDetails />
                    <Header />
                    {children}
                </body>
            </UserProvider>
        </html>
    );
}
