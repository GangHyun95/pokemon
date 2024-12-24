import axios from 'axios';
import React, { useEffect, useState } from 'react';

const pokemonBaseUrl = 'https://pokeapi.co/api/v2';

export type Pokemon = {
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

export type PokemonType = {
    type: {
        name: string;
        url: string;
    };
};

export const usePokemonData = () => {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [pokemonListDetails, setPokemonListDetails] = useState<
        PokemonDetail[]
    >([]);
    const [originalPokemonListDetails, setOriginalPokemonListDetails] =
        useState<PokemonDetail[]>([]);

    const fetchPokemon = async (page = 1): Promise<void> => {
        setLoading(true);
        try {
            const offset = (page - 1) * 50;
            const res = await axios.get(
                `${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`
            );

            setLoading(false);
            setPokemonList((prev) => [...prev, ...res.data.results]);
            setCurrentPage(page);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllPokemon = async (): Promise<void> => {
        try {
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=1118`);
            setAllPokemon(res.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPokemonDetails = async (): Promise<void> => {
        setLoading(true);
        try {
            const details = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);

                    return res.data;
                })
            );
            setLoading(false);

            setPokemonListDetails(details);

            setOriginalPokemonListDetails(details);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        if (pokemonList.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonList]);

    console.log('pokemonList:', pokemonList[0]);
    console.log('pokemonListDetails:', pokemonListDetails[0]);
    return { fetchPokemon, loading, pokemonList, pokemonListDetails };
};
