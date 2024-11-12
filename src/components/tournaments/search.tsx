import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
import Logo from "../ui/logo";

const Search = () => {
  return (
    <div className="w-full h-20 flex items-center justify-between gap-2 border-active border-b px-10">
      <h1 className="text-xl font-semibold py-4 w-full">Tournaments</h1>
      <Link
        href="/tournament/create"
        className="rounded-full border-active text-nowrap bg-purple px-4 py-1.5 text-xs flex items-center
       justify-center gap-1 active:scale-95 transition-all"
      >
        <Logo className="animate-spin [animation-duration:5s]" />
        Host tournament
      </Link>
      <div className="w-full flex items-center justify-end gap-2">
        <input
          className="bg-foreground px-4 rounded-full border border-active outline-none py-2"
          placeholder="search..."
        />
        <button className="size-10 rounded-full flex items-center justify-center bg-foreground active:scale-95 transition-transform border border-active">
          <BiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Search;
