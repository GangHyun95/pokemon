import { create } from 'zustand';
import { fetchAllPokemon, fetchPokemon, fetchPokemonDetails } from '@/lib/api';
import { Pokemon, PokemonDetail } from '@/lib/types';

type PokemonStore = {
    loading: boolean;
    count: number;
    searchQuery: string;
    pokemonList: Pokemon[];
    allPokemon: Pokemon[];
    pokemonListDetails: Record<number | string, PokemonDetail[]>;
    fetchPokemon: (page: number) => Promise<void>;
    fetchAllPokemon: () => Promise<void>;
    fetchPokemonDetails: (page: number) => Promise<void>;
    searchPokemon: (query: string) => void;
    updateSearchQuery: (query: string) => void;
};


let debounceTimer: NodeJS.Timeout | null = null;

export const usePokemonStore = create<PokemonStore>((set, get) => ({
    count: 0,
    loading: false,
    pokemonList: [],
    allPokemon: [],
    pokemonListDetails: {},
    searchQuery: '',

    fetchPokemon: async (page = 1) => {
        set({ loading: true });
        try {
            const data = await fetchPokemon(page);
            set({
                count: data.count,
                pokemonList: data.results,
                loading: false,
            });
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

    searchPokemon: async (query) => {
        const { allPokemon } = get();

        if (!query) {
            set((state) => ({
                pokemonListDetails: {
                    ...state.pokemonListDetails,
                    search: [],
                },
                searchQuery: '',
            }));
            return;
        }

        set({ loading: true });
        try {
            const filteredPokemon = allPokemon.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );

            const filteredDetails = await fetchPokemonDetails(
                filteredPokemon.map((pokemon) => ({ url: pokemon.url }))
            );

            set((state) => ({
                pokemonListDetails: {
                    ...state.pokemonListDetails,
                    search: filteredDetails,
                },
                loading: false,
            }));
        } catch (error) {
            console.error('포켓몬 검색 중 오류 발생:', error);
            set({ loading: false });
        }
    },

    updateSearchQuery: (query) => {
        const { searchPokemon } = get();
        set({ searchQuery: query });
        if (debounceTimer) clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            searchPokemon(query);
        }, 500);
    },
}));
