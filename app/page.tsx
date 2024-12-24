'use client';

import PokemonCard from '@/components/PokemonCard';
import { useGlobalContext } from '@/context/globalContext';
import { PokemonDetail } from '@/context/usePokemonData';
// import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
    // const { isLoading } = useUser();
    const { pokemonListDetails, loading } = useGlobalContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <section>{}</section>
            <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {!loading &&
                        pokemonListDetails.map(
                            (pokemon: PokemonDetail, index: number) => {
                                return <PokemonCard key={index} pokemon={pokemon}/>
                            }
                        )}
                </div>
            </section>
        </main>
    );
}
