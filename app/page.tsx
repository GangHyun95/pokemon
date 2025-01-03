'use client';

import { usePokemonStore } from '@/store/usePokemonStore';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import { useEffect } from 'react';

export default function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const {
        count,
        fetchPokemon,
        fetchPokemonDetails,
        fetchAllPokemon,
        allPokemon,
        pokemonListDetails,
        searchQuery
    } = usePokemonStore();
    const totalPages = Math.ceil(count / 20);

    useEffect(() => {
        const fetchData = async () => {
            if (!pokemonListDetails[page]) {
                await fetchPokemon(page);
                await fetchPokemonDetails(page);
            }
        };

        fetchData();
    }, [fetchPokemon, fetchPokemonDetails, page, pokemonListDetails]);

    useEffect(() => {
        if (allPokemon.length === 0) {
            const loadAllPokemon = async () => {
                await fetchAllPokemon();
            };

            loadAllPokemon();
        }
    }, [fetchAllPokemon, allPokemon]);

    // if (loading) return <Loading />;
    const pokemonData = searchQuery
        ? pokemonListDetails.search || []
        : pokemonListDetails[page] || [];

    return (
        <main>
            <section className='mt-10 flex items-center justify-center'>
                <SearchForm />
            </section>

            <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {pokemonData.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </section>
            <Pagination currentPage={page} totalPages={totalPages} />
        </main>
    );
}
