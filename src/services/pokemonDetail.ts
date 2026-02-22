import type { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { API_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface IGetPokemonDetailResponse {
  status: number | undefined;
  data: IPokemonDetailResponse | undefined;
}

export const pokemonDetailService = {
  getPokemonDetail: (name: string): Promise<IGetPokemonDetailResponse> => {
    const response = axios.get(`${API_BASE_URL}/pokemon/${name}`);
    return response;
  },
};
