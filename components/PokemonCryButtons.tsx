'use client';

import { volumeHigh } from '@/utils/Icons';

type Props = {
    cries: {
        legacy: string;
        latest: string;
    };
};

export default function PokemonCryButtons({ cries }: Props) {
    const handlePlayCry = (url: string) => {
        if (!url) return;
        const audio = new Audio(url);
        audio.play();
    };

    return (
        <div className='flex gap-4'>
            <button
                className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full
                    hover:bg-white/90 transition-all duration-300 ease-in-out'
                onClick={() => handlePlayCry(cries.legacy)}
            >
                {volumeHigh} Old Cry
            </button>
            <button
                className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full
                    hover:bg-white/90 transition-all duration-300 ease-in-out'
                onClick={() => handlePlayCry(cries.latest)}
            >
                {volumeHigh} New Cry
            </button>
        </div>
    );
}
