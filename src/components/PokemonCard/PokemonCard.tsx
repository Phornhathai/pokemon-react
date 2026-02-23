import type { Type } from "@/interface/pokemonDetail";
import { Link } from "react-router";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}

export default function PokemonCard({
  image,
  name,
  id,
  types,
}: PokemonCardProps) {
  return (
    <div className="bg-gray-200 block max-w-sm p-6 border border-default shadow-xs rounded-2xl">
      <div className="bg-[url('images/poke-card-bg.png')] bg-center bg-cover rounded-2xl">
        <Link
          to={`/detail/${name}`}
          className="bg-[url('images/poke-card-bg.png')]"
        >
          <img
            className="rounded-2xl object-contain w-full sm:h-48 md:h-48 p-4 lg:h-48"
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className="flex justify-between">
        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          {name}
        </h5>
        <h3 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          #{id}
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap mb-3 justify-end">
        {types?.map((type) => (
          <span
            className={`badge-type-${type.type.name} px-2 py-1 rounded-full text-sm font-medium capitalize cursor-pointer`}
            key={type.slot}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
