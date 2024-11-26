"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import useDebounce from "src/hooks/use-debounce";
import { useSearch } from "src/hooks/use-search";
import ClanSearchCard from "./clan-search-card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClanToTournament } from "src/actions/tournament/add-clan";
import { toast } from "sonner";
import ListClans from "./list-clans";

const AddClans = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce<string>(searchString, 500);
  const pathname = usePathname();
  const qc = useQueryClient();

  const { data, isLoading, error } = useSearch(
    `/api/clan/search/${debouncedSearch}`,
    debouncedSearch
  );

  const {
    mutate,
    data: mutateData,
    isPending,
  } = useMutation({
    mutationFn: addClanToTournament,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clan = (e.target as HTMLDivElement).getAttribute("data-clan");
    if (!clan) {
      toast.error("clan id not found!");
      return;
    }
    mutate({ clanId: clan, tournamentId: pathname.split("/")[3] });
  };

  useEffect(() => {
    if (!mutateData) return;
    toast.info(JSON.stringify(mutateData.message));
    qc.invalidateQueries({
      queryKey: ["tournament-clans", pathname.split("/")[3]],
    });
  }, [mutateData]);

  if (pathname.split("/")[2] !== "edit") {
    return <></>;
  }
  return (
    <div className="w-full min-h-32 flex flex-col gap-4 pb-96">
      <h3 className="text-xl font-semibold">Add clans</h3>
      <div className="w-full flex gap-4 items-center relative">
        <input
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          placeholder="search clan.."
          className="text-lg outline-none bg-transparent rounded-lg border border-active px-3 py-2 w-80"
        />
        <button
          className="size-12 flex items-center justify-center rounded-full text-white border border-active shrink-0 transition-transform"
          onClick={() => {
            if (searchString) setSearchString("");
          }}
        >
          {isLoading || isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>{searchString ? <IoClose size={20} /> : <IoSearch size={20} />}</>
          )}
        </button>
        {data && (
          <div
            className="absolute left-0 top-12 flex flex-col bg-[#202020] rounded-lg max-h-80 h-fit overflow-y-scroll custom-scrollbar"
            onClick={handleClick}
          >
            {data?.clan.map(({ imageUrl, uniqueName, name, _id }: any) => {
              return (
                <ClanSearchCard
                  imageUrl={imageUrl}
                  uniqueName={uniqueName}
                  name={name}
                  key={`clan-${uniqueName}`}
                  id={_id}
                />
              );
            })}
          </div>
        )}
      </div>
      <ListClans />
    </div>
  );
};

export default AddClans;
