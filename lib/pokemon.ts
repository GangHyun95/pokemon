const pokemonBaseUrl = 'https://pokeapi.co/api/v2';

type Pokemon = {
    name: string;
    url: string;
};

export type PokemonDetail = {
    id: number;
    name: string;
    weight: number;
    height: number;
    base_experience: number;
    types: PokemonType[];
    sprites: {
        front_default: string;
        other?: {
            home?: {
                front_default?: string;
            };
        };
    };
};

export type ActivePokemon = {
    id: number;
    name: string;
    abilities: AbilitiesType[];
    types: PokemonType[];
    stats: StatsType[];
    height: number;
    weight: number;
    base_experience: number;
    cries: {
        legacy: string;
        latest: string;
    };
    sprites: {
        front_default: string;
        other?: {
            home?: {
                front_default?: string;
                front_shiny?: string;
            };
            showdown?: {
                front_default?: string;
            };
        };
    };
};

type PokemonType = {
    type: {
        name: string;
        url: string;
    };
};

type AbilitiesType = {
    ability: {
        name: string;
        url: string;
    }
}

type StatsType = {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    }
}

export async function fetchPokemon(page = 1): Promise<{ count: number; results: Pokemon[] }> {
    const offset = (page - 1) * 20;
    const response = await fetch(`${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`);
    if (!response.ok) {
        throw new Error('포켓몬 목록을 가져오는 데 실패했습니다.');
    }
    const data = await response.json();
    return { count: data.count, results: data.results };
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

export async function fetchPokemonByName(name: string): Promise<ActivePokemon> {
    const response = await fetch(`${pokemonBaseUrl}/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`포켓몬(${name}) 정보를 가져오는 데 실패했습니다.`);
    }
    return await response.json();
}
