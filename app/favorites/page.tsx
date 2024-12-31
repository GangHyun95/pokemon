'use client';

import PokemonCard from '@/components/PokemonCard';
import { ActivePokemon, fetchPokemonByName } from '@/lib/pokemon';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

export default function page() {
    const { userDetails } = useUserStore();
    const [likedPokemons, setLikedPokemons] = useState<ActivePokemon[]>([]);
    const [loading, setLoading] = useState(false);
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

    if (loading) {
        return (
            <div className='h-[100vh] flex justify-center items-center'>
                <div className='loader'></div>
            </div>
        );
    }
    return (
        <main>
            {!loading && <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {likedPokemons.length > 0 ? (
                        likedPokemons.map((pokemon, index) => (
                            <PokemonCard
                                key={pokemon.name + index}
                                pokemon={pokemon}
                            />
                        ))
                    ) : (
                        <h2 className='text-center text-2xl font-bold text-gray-800 mt-20'>
                            No liked pokemons
                        </h2>
                    )}
                </div>
            </section>}
        </main>
    );
}
