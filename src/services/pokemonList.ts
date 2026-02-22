import type { IPokemonListResponse } from "@/interface/pokemonList";
import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface IGetPokemonListResponse {
  status: number | undefined;
  data: IPokemonListResponse | undefined;
}

export const pokemonListService = {
  getPokemonList: (
    limit?: number,
    offset?: number,
  ): Promise<IGetPokemonListResponse> => {
    const response = axios.get(
      `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );
    return response;
  },
};
