import type { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface IGetPokemonDetailResponse {
  status: number | undefined;
  data: IPokemonDetailResponse | undefined;
}

export const pokemonDetailService = {
  getPokemonDetail: async (
    name: string,
  ): Promise<IGetPokemonDetailResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status ?? 500,
          data: undefined,
        };
      }
      return {
        status: 500,
        data: undefined,
      };
    }
  },
};
