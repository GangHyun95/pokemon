import { Pokemon, PokemonDetail } from './types';

const pokemonBaseUrl = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(page = 1): Promise<{ count: number; results: Pokemon[] }> {
    const offset = (page - 1) * 20;
    const response = await fetch(`${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`);
    if (!response.ok) {
        throw new Error('포켓몬 목록을 가져오는 데 실패했습니다.');
    }
    const data = await response.json();
    return { count: data.count, results: data.results };
}

export async function fetchAllPokemon(): Promise<Pokemon[]> {
    const response = await fetch(`${pokemonBaseUrl}/pokemon?limit=1118`);
    if (!response.ok) {
        throw new Error('전체 포켓몬 목록을 가져오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data.results;
}

export async function fetchPokemonDetails(pokemonList: { url: string }[]): Promise<PokemonDetail[]> {
    const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
                throw new Error(`포켓몬 상세 정보를 가져오는 데 실패했습니다. URL: ${pokemon.url}`);
            }
            return await response.json();
        })
    );
    return details;
}

export async function fetchPokemonByName(name: string): Promise<PokemonDetail> {
    const response = await fetch(`${pokemonBaseUrl}/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`포켓몬(${name}) 정보를 가져오는 데 실패했습니다.`);
    }
    return await response.json();
}
