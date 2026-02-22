import type { Generation } from "@/interface/type";
import { generationList, typesList, sortList } from "@/utils/optionList";

export default function SearchForm() {
  return (
    <div className="grid grid-cols-4 gap-x-5 text-white">
      <div className="">
        <label
          htmlFor="generation"
          className="block mb-2 text-md font-medium dark:text-white"
        >
          Generation
        </label>
        <select
          id="generation"
          className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#325eaa] focus:border-[#325eaa] block w-full p-2.5"
        >
          <option selected value="">
            Choose a generation
          </option>
          {generationList.map((generation: Generation, index: number) => {
            return (
              <option
                value={index}
                key={`generation-key-${index}`}
                className="capitalize"
              >
                {generation.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="type"
          className="block mb-2 text-md font-medium dark:text-white"
        >
          Type
        </label>
        <select
          id="type"
          className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#325eaa] focus:border-[#325eaa] block w-full p-2.5"
        >
          <option selected value="">
            Choose a type
          </option>
          {typesList.map((type: string, index: number) => {
            return (
              <option
                value={index}
                key={`type-key-${index}`}
                className="capitalize"
              >
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="sort"
          className="block mb-2 text-md font-medium dark:text-white"
        >
          Sort by
        </label>
        <select
          id="sort"
          className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#325eaa] focus:border-[#325eaa] block w-full p-2.5"
        >
          <option value="">Choose a sort option</option>
          {sortList.map((sortOption: string, index: number) => {
            return (
              <option
                value={index}
                key={`sort-key-${index}`}
                className="capitalize"
              >
                {sortOption}
              </option>
            );
          })}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="search"
          className="block mb-2 text-md font-medium dark:text-white"
        >
          Search
        </label>
        <input
          id="search"
          className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#325eaa] focus:border-[#325eaa] block w-full p-2.5"
          placeholder="Search by name or ID"
        />
      </div>
    </div>
  );
}
