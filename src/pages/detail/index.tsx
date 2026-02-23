import logo from "@/../public/images/logo.webp";
import type { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailService } from "@/services";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type PokemonType = {
  data: IPokemonDetailResponse[];
  loading: boolean;
  error: null | object;
};

export default function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonType>({
    data: [],
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    const responseDetail = await pokemonDetailService.getPokemonDetail(name);
    if (responseDetail.status === 200) {
      setPokemon({
        data: [responseDetail.data as IPokemonDetailResponse],
        loading: false,
        error: null,
      });
    } else {
      setPokemon({
        data: [],
        loading: false,
        error: responseDetail || "Failed to fetch pokemon detail",
      });
    }
  };

  useEffect(() => {
    if (name) {
      const loadData = async () => {
        await callData(name);
      };
      loadData();
    }
  }, [name]);

  return (
    <div className="w-[90%] m-auto max-w-275">
      <div className="flex justify-center items-center">
        <img src={logo} className="max-h-20 mt-5" alt="logo" />
      </div>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        ← Back
      </Link>
      <div className="w-[90%] max-w-150 m-auto">
        {pokemon.loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : pokemon.error ? (
          <div className="text-center py-8 text-red-500">
            Error loading pokemon
          </div>
        ) : (
          pokemon.data?.map((item) => {
            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shadow-lg dark:bg-gray-800 dark:border-gray-700 p-6 m-auto bg-white"
              >
                <div className="bg-center aspect-square w-full bg-cover rounded-2xl relative h-80">
                  <img
                    src="/images/pokemon_bg.png"
                    alt={item.name}
                    className="absolute h-auto max-h-96 aspect-square -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-50"
                  />
                  <img
                    src={item.sprites.other["official-artwork"].front_default}
                    alt={item.name}
                    className="absolute rounded-lg lg:h-56 sm:h-72 p-4 aspect-square -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 drop-shadow-md"
                  />
                </div>
                <div className="pt-6 text-center">
                  <h1 className="text-4xl font-bold capitalize text-gray-800 dark:text-white">
                    {item.name}
                  </h1>
                  <div className="mt-2 flex gap-2 justify-center flex-wrap">
                    {item.types?.map((type) => (
                      <span
                        key={type.type.name}
                        className={`badge-type-${type.type.name} px-2 py-1 rounded-full text-sm font-medium capitalize cursor-pointer`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      Height: {item.height}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Weight: {item.weight}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Base Experience: {item.base_experience}
                    </p>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                        Abilities
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.abilities
                          ?.map((ab) => ab.ability.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
