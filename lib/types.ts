export type Pokemon = {
    name: string;
    url: string;
};

export type PokemonDetail = {
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