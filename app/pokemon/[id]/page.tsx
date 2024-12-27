'use client';

import { useGlobalContext } from '@/context/globalContext';
import {
    AbilitiesType,
    PokemonType,
    StatsType,
} from '@/context/usePokemonData';
import { typeColor } from '@/utils/colors';
import { volumeHigh } from '@/utils/Icons';
import { Ruler, Weight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

type Props = {
    params: {
        id: string;
    }
};

export default function Page({ params }: Props) {
    const { id } = params;
    const { fetchPokemonByName, loading, activePokemon } = useGlobalContext();

    useEffect(() => {
        fetchPokemonByName(id);
    }, [id]);

    const typeName = activePokemon?.types?.length
        ? activePokemon.types[
              Math.floor(Math.random() * activePokemon.types.length)
        ]?.type?.name
        : undefined;

    const backgroundColor = typeName ? typeColor[typeName] : 'transparent';

    return (
        <main>
            {loading && (
                <div className='h-[80vh] flex justify-center items-center'>
                    <div className='loader'></div>
                </div>
            )}
            {!loading && (
                <section
                    className='px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8'
                    style={{
                        background: backgroundColor,
                    }}
                >
                    <div className='flex flex-col justify-center gap-6'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-4'>
                                <button
                                    className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full
                                    hover:bg-white/90 transition-all duration-300 ease-in-out'
                                    onClick={() => {
                                        const audio = new Audio(
                                            activePokemon?.cries.legacy
                                        );
                                        audio.play();
                                    }}
                                >
                                    {volumeHigh} Old Cry
                                </button>
                                <button
                                    className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full
                                    hover:bg-white/90 transition-all duration-300 ease-in-out'
                                    onClick={() => {
                                        const audio = new Audio(
                                            activePokemon?.cries.latest
                                        );
                                        audio.play();
                                    }}
                                >
                                    {volumeHigh} New Cry
                                </button>
                            </div>

                            <h1 className='text-6xl font-bold capitalize text-white drop-shadow-sm'>
                                {activePokemon?.name}
                            </h1>
                        </div>

                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-2xl font-bold'>
                                    Abilities
                                </h2>
                                <ul className='flex gap-2'>
                                    {activePokemon?.abilities.map(
                                        (
                                            ability: AbilitiesType,
                                            index: number
                                        ) => (
                                            <li
                                                key={index}
                                                className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-skyBlue rounded-full'
                                            >
                                                {ability.ability.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h2 className='text-2xl font-bold'>Types</h2>
                                <ul className='flex flex-wrap gap-2'>
                                    {activePokemon?.types.map(
                                        (type: PokemonType, index: number) => (
                                            <li
                                                key={index}
                                                className='px-4 py-2 flex items-center gap-2 text-sm font-bold bg-zinc-700 text-white rounded-full'
                                            >
                                                {type.type.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>Base Stats</h2>
                            <ul className='flex flex-col gap-4'>
                                {activePokemon?.stats.map(
                                    (stat: StatsType, index: number) => (
                                        <li
                                            key={index}
                                            className='flex flex-col gap-1'
                                        >
                                            <div className='flex items-center gap-4'>
                                                <span className='capitalize'>
                                                    {stat.stat.name}
                                                </span>
                                                <span className='font-bold'>
                                                    {stat.base_stat}
                                                </span>
                                            </div>

                                            <div className='w-full h-3 bg-white/15 rounded-md overflow-hidden mt-1'>
                                                <div
                                                    className='h-full rounded-md bg-white'
                                                    style={{
                                                        width: `${
                                                            (stat.base_stat /
                                                                200) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className='mt-2 flex gap-4'>
                            <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                                <span className='text-sm flex items-center gap-2'>
                                    <Ruler size={18} />
                                    Height
                                </span>
                                {activePokemon?.height} m
                            </p>
                            <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                                <span className='text-sm flex items-center gap-2'>
                                    <Weight size={18} />
                                    Weight
                                </span>
                                {activePokemon?.weight} kg
                            </p>
                            <p className='p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg'>
                                <span className='text-sm flex items-center gap-2'>
                                    <Weight size={18} />
                                    Base Exp
                                </span>
                                {activePokemon?.base_experience} xp
                            </p>
                        </div>
                    </div>
                    <div className='relative flex justify-center items-center'>
                        <Image
                            src={`/icons/${activePokemon?.types[0].type.name}.svg`}
                            alt='pokemon type'
                            width={700}
                            height={700}
                            className='absolute opacity-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        />
                        <Image
                            src={
                                activePokemon?.sprites?.other?.home
                                    ?.front_shiny ||
                                activePokemon?.sprites?.other?.showdown
                                    ?.front_default ||
                                activePokemon?.sprites?.front_default ||
                                '/pokemon--logo.png'
                            }
                            alt='pokemon image'
                            width={500}
                            height={500}
                            className='relative z-10 filter drop-shadow-lg'
                        />
                    </div>
                </section>
            )}
        </main>
    );
}
