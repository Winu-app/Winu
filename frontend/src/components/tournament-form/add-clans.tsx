"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useDebounce from "src/hooks/use-debounce";
import { useSearch } from "src/hooks/use-search";

const AddClans = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce<string>(searchString, 500);
  const pathname = usePathname();

  const { data, isLoading, error } = useSearch("/api/clan", debouncedSearch);

  if (pathname.split("/")[2] !== "edit") {
    return <></>;
  }
  return (
    <div className="w-full min-h-32 flex flex-col gap-4 pb-96">
      <h3 className="text-xl font-semibold">Add clans</h3>
      <div className="w-full flex gap-4 items-center">
        <input
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          placeholder="search clan.."
          className="text-lg outline-none bg-transparent rounded-lg border border-active px-3 py-2"
        />
        <button className="size-12 flex items-center justify-center rounded-full text-white border border-active shrink-0 transition-transform active:scale-95">
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddClans;
