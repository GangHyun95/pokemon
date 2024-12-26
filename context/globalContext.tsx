import React, { createContext, useContext, useState } from 'react';
import { ActivePokemon, Pokemon, PokemonDetail, usePokemonData } from './usePokemonData';

type GlobalContextType = {
    loading: boolean;
    fetchPokemon: (page?: number) => Promise<void>;
    pokemonList: Pokemon[];
    pokemonListDetails: PokemonDetail[];
    fetchPokemonByName: (name: string) => void;
    activePokemon: ActivePokemon | null;
    loadMore: () => void;
};
const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const {
        fetchPokemon,
        loading,
        pokemonList,
        pokemonListDetails,
        fetchPokemonByName,
        activePokemon,
        loadMore
    } = usePokemonData();

    return (
        <GlobalContext.Provider
            value={{
                loading,
                fetchPokemon,
                pokemonList,
                pokemonListDetails,
                fetchPokemonByName,
                activePokemon,
                loadMore
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            'useGlobalContext는 GlobalContextProvider 내에서 사용되어야 합니다.'
        );
    }
    return context;
};
