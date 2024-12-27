import PokemonCard from '@/components/PokemonCard';
import { PokemonDetail } from '@/lib/pokemon';
import { fetchPokemon, fetchPokemonDetails } from '@/lib/pokemon';
import { arrowAngleDown } from '@/utils/Icons';

export default async function Home() {
    const pokemonList = await fetchPokemon(1);
    const pokemonListDetails = await fetchPokemonDetails(pokemonList);

    return (
        <main>
            <section>{}</section>
            <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {pokemonListDetails.map((pokemon: PokemonDetail) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </section>

            {/* {pokemonListDetails.length > 18 && (
                <div className='mt-4 mb-10 flex items-center justify-center'>
                    <button
                        onClick={loadMore}
                        className='py-2 px-6 flex items-center gap-2 bg-purple rounded-full shadow-md font-medium 
                    hover:bg-green-300 text-white transition-all duration-300 ease-in-out'
                    >
                        <span className='text-left'>{arrowAngleDown}</span>Load
                        More
                    </button>
                </div>
            )} */}
        </main>
    );
}
