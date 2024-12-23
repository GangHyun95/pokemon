import React, { createContext, useState } from 'react';
import { usePokemonData } from './usePokemonData';
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const { fetchPokemon, loading, pokemonList, pokemonListDetails } =
        usePokemonData();

    return (
        <GlobalContext.Provider
            value={{
                loading,
                fetchPokemon,
                pokemonList,
                pokemonListDetails,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
