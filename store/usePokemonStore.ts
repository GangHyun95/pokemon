import { create } from 'zustand';
import { fetchAllPokemon, fetchPokemon, fetchPokemonByName, fetchPokemonDetails } from '@/lib/api';
import { Pokemon, PokemonDetail } from '@/lib/types';

type PokemonStore = {
    count: number;
    loading: boolean;
    currentPage: number;
    pokemonList: Pokemon[];
    allPokemon: Pokemon[];
    searchQuery: string;
    pokemonListDetails: Record<number, PokemonDetail[]>;
    fetchPokemon: (page: number) => Promise<void>;
    fetchAllPokemon: () => Promise<void>;
    fetchPokemonDetails: (page: number) => Promise<void>;
};
export const usePokemonStore = create<PokemonStore>((set, get) => ({
    count: 0,
    loading: false,
    pokemonList: [],
    currentPage: 1,
    allPokemon: [],
    pokemonListDetails: {},
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

    fetchPokemonDetails: async (page = 1) => {
        const { pokemonList, pokemonListDetails } = get();

        if (pokemonListDetails[page]) return;

        set({ loading: true });
        try {
            const details = await fetchPokemonDetails(
                pokemonList.map((pokemon) => ({ url: pokemon.url }))
            );
            set((state) => ({
                pokemonListDetails: {
                    ...state.pokemonListDetails,
                    [page]: details,
                },
                loading: false,
            }));
        } catch (error) {
            console.error('포켓몬 상세 정보를 가져오는 데 실패했습니다:', error);
            set({ loading: false });
        }
    },
}));
