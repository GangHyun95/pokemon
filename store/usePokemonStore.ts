import { Pokemon, PokemonDetail } from '@/lib/types';
import { fetchAllPokemon, fetchPokemon, fetchPokemonByName, fetchPokemonDetails } from '@/lib/api';
import { create } from 'zustand';

type PokemonStore = {
    count: number;
    loading: boolean;
    pokemonList: Pokemon[];
    currentPage: number;
    allPokemon: Pokemon[];
    pokemonListDetails: PokemonDetail[];
    searchQuery: string;
    fetchPokemon: (page: number) => Promise<void>;
    fetchAllPokemon: () => Promise<void>;
    fetchPokemonDetails: () => Promise<void>;
};

export const usePokemonStore = create<PokemonStore>((set, get) => ({
    count: 0,
    loading: true,
    pokemonList: [],
    currentPage: 1,
    allPokemon: [],
    pokemonListDetails: [],
    searchQuery: '',

    fetchPokemon: async (page = 1) => {
        set({ loading: true });
        try {
            const data = await fetchPokemon(page);
            set({ count: data.count, pokemonList: data.results, currentPage: page, loading: false });
        } catch (error) {
            console.error('포켓몬 목록을 가져오는 데 실패했습니다:', error);
            set({ loading: false });
        }
    },

    fetchAllPokemon: async () => {
        set({ loading: true });
        try {
            const results = await fetchAllPokemon();
            set({ allPokemon: results, loading: false });
        } catch (error) {
            console.error('전체 포켓몬 목록을 가져오는 데 실패했습니다:', error);
            set({ loading: false });
        }
    },

    fetchPokemonDetails: async () => {
        const { pokemonList } = get();
        set({ loading: true });
        try {
            const details = await fetchPokemonDetails(pokemonList);
            set({ pokemonListDetails: details, loading: false });
        } catch (error) {
            console.error('포켓몬 상세 정보를 가져오는 데 실패했습니다:', error);
            set({ loading: false });
        }
    },
}));
