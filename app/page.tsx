import { fetchPokemon, fetchPokemonDetails } from '@/lib/pokemon';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import Filters from '@/components/Filters';

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
    const page = parseInt(searchParams.page || '1', 10);
    const { count, results } = await fetchPokemon(page);
    const totalPages = Math.ceil(count / 20);
    const pokemonListDetails = await fetchPokemonDetails(results);

    return (
        <main>
            <section className='mt-10 flex items-center justify-center'>
                <SearchForm />
            </section>
            <section>
                <Filters />
            </section>

            <section className='min-h-[91vh]'>
                <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {pokemonListDetails.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </section>
            <Pagination currentPage={page} totalPages={totalPages} />
        </main>
    );
}
