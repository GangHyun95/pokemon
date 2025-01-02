'use client';

import { usePokemonStore } from '@/store/usePokemonStore';
import { search } from '@/utils/Icons';
import React from 'react';

export default function SearchForm() {
    const { searchQuery, updateSearchQuery } = usePokemonStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        updateSearchQuery(query);
    };
    return (
        <form className='relative w-4/5 md:w-1/2'>
            <input
                type='text'
                value={searchQuery}
                onChange={handleInputChange}
                placeholder='Search Pokemon'
                className='shadow-sm w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800'
            />
            <span className='absolute right-6 text-3xl top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer pointer-events-none'>
                {search}
            </span>
        </form>
    );
}
