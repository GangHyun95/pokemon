'use client';

import PokemonCard from '@/components/PokemonCard';
import { useGlobalContext } from '@/context/globalContext';
import { PokemonDetail } from '@/context/usePokemonData';
import { arrowAngleDown } from '@/utils/Icons';
// import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
    // const { isLoading } = useUser();
    const { pokemonListDetails, loading, loadMore } = useGlobalContext();

    return (
        <main>
            <section>{}</section>
            <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {!loading &&
                        pokemonListDetails.map(
                            (pokemon: PokemonDetail, index: number) => {
                                return (
                                    <PokemonCard
                                        key={index}
                                        pokemon={pokemon}
                                    />
                                );
                            }
                        )}
                </div>
            </section>

            {pokemonListDetails.length > 18 && (
                <div className='mt-4 mb-10 flex items-center justify-center'>
                    <button onClick={loadMore} className='py-2 px-6 flex items-center gap-2 bg-purple rounded-full shadow-md font-medium 
                    hover:bg-green-300 text-white transition-all duration-300 ease-in-out'>
                        <span className='text-left'>{arrowAngleDown}</span>Load More
                    </button>
                </div>
            )}
        </main>
    );
}
