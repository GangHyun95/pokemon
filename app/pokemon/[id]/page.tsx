'use client';

import { useGlobalContext } from '@/context/globalContext';
import { typeColor } from '@/utils/colors';
import Image from 'next/image';
import React, { useEffect } from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
    const { id } = React.use(params);
    const { fetchPokemonByName, loading, activePokemon } = useGlobalContext();

    useEffect(() => {
        fetchPokemonByName(id);
    }, [id]);

    return (
        <main>
            <section
                className='px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8'
                style={{
                    background:
                        typeColor[
                            activePokemon?.types[
                                Math.floor(
                                    Math.random() * activePokemon?.types.length
                                )
                            ].type.name
                        ],
                }}
            >
                <div></div>
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
                            activePokemon?.sprites?.other?.home?.front_shiny ||
                            activePokemon?.sprites?.other?.showdown?.front_default ||
                            activePokemon?.sprites?.front_default
                        }
                        alt='pokemon image'
                        width={500}
                        height={500}
                        className='relative z-10 filter drop-shadow-lg'
                    />
                </div>
            </section>
        </main>
    );
}
