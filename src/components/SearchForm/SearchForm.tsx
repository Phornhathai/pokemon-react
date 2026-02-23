import type { Generation } from "@/interface/type";
import { generationList, typesList, sortList } from "@/utils/optionList";
import { useSearchForm } from "@/components/SearchForm";

export default function SearchForm() {
  const { fieldKeyword, fieldGeneration, fieldType, fieldSorting } =
    useSearchForm();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-white">
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
          {...fieldGeneration}
        >
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
          {...fieldType}
        >
          {typesList.map((type: string, index: number) => {
            return (
              <option
                value={type}
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
          {...fieldSorting}
        >
          {sortList.map((sortOption: string, index: number) => {
            return (
              <option
                value={sortOption}
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
          {...fieldKeyword} // Register the input field with react-hook-form
          id="search"
          className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#325eaa] focus:border-[#325eaa] block w-full p-2.5"
          placeholder="Search by name or ID"
        />
      </div>
    </div>
  );
}
