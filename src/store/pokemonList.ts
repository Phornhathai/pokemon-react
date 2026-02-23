import type { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { create } from "zustand";

const initialState = {
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  fetchPokemon: {
    data: [],
    loading: false,
    error: null,
  },
};

type PokemonType = {
  data: IPokemonDetailResponse[];
  loading: boolean;
  error: null | object;
};

type UsePokemonListStoreType = {
  pokemon: PokemonType;
  fetchPokemon: PokemonType;
  setPokemonList: (value: PokemonType) => void;
  setFetchPokemonList: (value: PokemonType) => void;
  clearPokemon: () => void;
};

export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
  ...initialState,
  setPokemonList: (value: PokemonType) => set({ pokemon: value }),
  setFetchPokemonList: (value: PokemonType) => set({ fetchPokemon: value }),
  clearPokemon: () => set({ pokemon: initialState.pokemon }),
}));
