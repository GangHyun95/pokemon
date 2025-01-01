'use client';

import { usePokemonStore } from '@/store/usePokemonStore';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import Filters from '@/components/Filters';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const {
        count,
        loading,
        fetchPokemon,
        fetchPokemonDetails,
        pokemonListDetails,
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

    if (loading) return <Loading />;

    return (
        <main>
            <section className="mt-10 flex items-center justify-center">
                <SearchForm />
            </section>
            <section>
                <Filters />
            </section>

            <section className="min-h-[91vh]">
                <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {pokemonListDetails[page]?.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </section>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </main>
    );
}
