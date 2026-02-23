import type { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailService, pokemonListService } from "@/services";
import { usePokemonListStore } from "@/store/pokemonList";
import { generationList } from "@/utils/optionList";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const useSearchForm = () => {
  const { register, control } = useForm();
  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();
  const searchKey = useWatch({ control, name: "search", defaultValue: "" });
  const generationKey = useWatch({
    control,
    name: "generation",
    defaultValue: {
      name: "",
      limit: 10,
      offset: 0,
    },
  });
  const typeKey = useWatch({
    control,
    name: "type",
    defaultValue: "all types",
  });
  const sortingKey = useWatch({ control, name: "sorting", defaultValue: "id" });

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({
      data: [],
      loading: true,
      error: null,
    });

    const responseList = await pokemonListService.getPokemonList(
      filter.limit,
      filter.offset,
    );
    const pokeList: IPokemonDetailResponse[] = [];

    if (responseList.status === 200) {
      const result = responseList?.data?.results || [];
      const responseDetail = await Promise.all(
        result.map((pokemon) =>
          pokemonDetailService.getPokemonDetail(pokemon.name),
        ),
      );
      responseDetail.forEach((response) => {
        const pokeData = response.data;
        if (pokeData) {
          pokeList.push({
            ...pokeData,
            image: pokeData.sprites.other["official-artwork"].front_default,
          });
        }
      });
      // set raw list for filtering, and set filtered list for rendering
      setFetchPokemonList({
        data: pokeList,
        loading: false,
        error: null,
      });
      const data = filterPokemon(pokeList, searchKey, typeKey, sortingKey);
      setPokemonList({
        data: data,
        loading: false,
        error: null,
      });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList || "Failed to fetch pokemon list",
      });
    }
  };

  const filterPokemon = (
    pokeList: IPokemonDetailResponse[],
    keyword: string,
    type: string,
    sort: "id" | "name",
  ) => {
    console.log("keyword", keyword, "type", type, "sort", sort);
    const keywordFilter = pokeList.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );

    const typeFilter =
      type !== "all types"
        ? keywordFilter?.filter((item) =>
            item.types.find((typeItem) =>
              typeItem.type.name.toLowerCase().includes(type.toLowerCase()),
            ),
          )
        : keywordFilter;

    return sortedPokemon(sort, typeFilter || []);
  };

  const sortedPokemon = (
    type: "id" | "name",
    data: IPokemonDetailResponse[],
  ) => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
        );
      default:
        return [...data].sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    if (!generationKey) return;
    const filter = generationList[generationKey] || {
      name: "",
      limit: 10,
      offset: 0,
    };

    if (filter) callData(filter);
  }, [generationKey]);

  useEffect(() => {
    const data = filterPokemon(
      fetchPokemon.data || [],
      searchKey,
      typeKey,
      sortingKey,
    );
    console.log(
      "searchKey",
      searchKey,
      "typeKey",
      typeKey,
      "sortingKey",
      sortingKey,
      "filter group",
    );
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [searchKey, typeKey, sortingKey]);

  return {
    fieldKeyword: register("search"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSorting: register("sorting"),
  };
};

export { useSearchForm };
