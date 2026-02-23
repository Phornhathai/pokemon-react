import type {
  IPokemonListItem,
  IPokemonListResponse,
} from "@/interface/pokemonList";
import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface IGetPokemonListResponse {
  results: IPokemonListItem[];
  status: number | undefined;
  data: IPokemonListResponse | undefined;
}

export const pokemonListService = {
  getPokemonList: async (
    limit?: number,
    offset?: number,
  ): Promise<IGetPokemonListResponse> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pokemon?limit=${limit ?? 10}&offset=${offset ?? 0}`,
      );

      return {
        results: response.data.results,
        status: response.status,
        data: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          results: [],
          status: error.response?.status ?? 500,
          data: undefined,
        };
      }
      return {
        results: [],
        status: 500,
        data: undefined,
      };
    }
  },
};
