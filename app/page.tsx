'use client';

import { usePokemonStore } from '@/store/usePokemonStore';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const router = useRouter();
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

    const [lastVisitedPage, setLastVisitedPage] = useState(page);
    const itemsPerPage = 20;

    const isSearching = searchQuery !== '';
    const searchResults = pokemonListDetails.search || [];
    const totalSearchPages = Math.ceil(searchResults.length / itemsPerPage);
    const totalPages = isSearching ? totalSearchPages : Math.ceil(count / itemsPerPage);

    const pokemonData = isSearching
        ? searchResults.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : pokemonListDetails[page] || [];

    
    useEffect(() => {
        if (isSearching) {
            setLastVisitedPage(page);
            if (page !== 1) router.push('/?page=1');
        } else if (!isSearching && lastVisitedPage !== page) {
            router.push(`/?page=${lastVisitedPage}`);
        }
    }, [isSearching]);

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
