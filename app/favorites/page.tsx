'use client';

import PokemonCard from '@/components/PokemonCard';
import { PokemonDetail } from '@/lib/types';
import { fetchPokemonByName } from '@/lib/api';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

export default function page() {
    const { userDetails } = useUserStore();
    const [likedPokemons, setLikedPokemons] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (userDetails?.liked) {
            setLoading(true);
            const fetchPokemons = async () => {
                const pokemonDetails = await Promise.all(
                    userDetails?.liked.map(async (pokemon) => {
                        const details = await fetchPokemonByName(pokemon);
                        return details;
                    })
                );
                setLikedPokemons(pokemonDetails);
            };
            setLoading(false);
            fetchPokemons();
        }
    }, [userDetails?.liked]);

    if (loading) return <Loading />;

    return (
        <main>
            {!loading && (
                <section className='min-h-[91vh]'>
                    {likedPokemons.length > 0 ? (
                        <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {likedPokemons.map((pokemon, index) => (
                                <PokemonCard
                                    key={pokemon.name + index}
                                    pokemon={pokemon}
                                />
                            ))}
                        </div>
                    ) : (
                        <h2 className='text-center text-2xl font-bold text-gray-800 mt-20'>
                            No liked pokemons
                        </h2>
                    )}
                </section>
            )}
        </main>
    );
}
