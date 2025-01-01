'use client';

import { PokemonDetail } from '@/lib/types';
import { useUserStore } from '@/store/useUserStore';
import {
    bookmarkEmpty,
    bookmarkFilled,
    heartEmpty,
    heartFilled,
} from '@/utils/Icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ActionButtons({ pokemon }: { pokemon: PokemonDetail }) {
    const { user} = useUser();
    const { performAction, userDetails } = useUserStore();
    const router = useRouter();

    const isLiked = userDetails?.liked.includes(pokemon.name);
    const isBookmarked = userDetails?.bookmarks.includes(pokemon.name);

    const [liked, setLiked] = useState(isLiked);
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const handleAction = (pokemon: string, action: 'bookmark' | 'like') => {
        if (user?.sub) {
            action === 'bookmark'
                ? setBookmarked((prev) => !prev)
                : setLiked((prev) => !prev);
            performAction(user.sub, pokemon, action);
        } else {
            router.push('/api/auth/login');
        }
    };

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);


    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    return (
        <div className='flex gap-4 bg-white rounded-tl-xl rounded-tr-xl'>
            <button
                className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 ${
                    liked
                        ? 'text-[#fd4878] border-[#fd4878]'
                        : 'text-gray-300 border-gray-300'
                }`}
                onClick={() => handleAction(pokemon.name, 'like')}
            >
                {liked ? heartFilled : heartEmpty}
            </button>
            <button
                className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 ${
                    bookmarked
                        ? 'text-[#00b894] border-[#00b894]'
                        : 'text-gray-300 border-gray-300'
                }`}
                onClick={() => handleAction(pokemon.name, 'bookmark')}
            >
                {bookmarked ? bookmarkFilled : bookmarkEmpty}
            </button>
        </div>
    );
}
