import logo from "@/../public/images/logo.webp";
import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from "@/store/pokemonList";
import PokemonCard from "@/components/PokemonCard";

export default function HomePage() {
  const { pokemon, fetchPokemon } = usePokemonListStore();

  return (
    <div className="w-[90%] m-auto max-w-275">
      <div className="flex justify-center items-center">
        <img src={logo} className="max-h-20 mt-5" alt="logo" />
      </div>
      <SearchForm />
      <div className="mt-5">
        {fetchPokemon.loading ? (
          <div className="h-150 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {pokemon.data?.map((item) => (
              <PokemonCard
                key={item.id}
                image={item.sprites.front_default}
                name={item.name}
                id={item.id}
                types={item.types}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
