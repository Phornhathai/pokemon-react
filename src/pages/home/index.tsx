import { pokemonDetailService, pokemonListService } from "@/services";
import { useEffect } from "react";
import logo from "@/images/logo.webp";
import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  const fetchPokemonList = async () => {
    const response = await pokemonListService.getPokemonList();
    console.log(response.data);
  };

  const fetchPokemonDetail = async () => {
    const response = await pokemonDetailService.getPokemonDetail("ditto");
    console.log(response.data);
  };

  useEffect(() => {
    fetchPokemonList();
    fetchPokemonDetail();
  }, []);

  return (
    <div className="w-[90%] m-auto max-w-275">
      <div className="flex justify-center items-center">
        <img src={logo} className="max-h-20 mt-5" alt="logo" />
      </div>
      <SearchForm />
    </div>
  );
}
