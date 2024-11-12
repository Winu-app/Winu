import { parseAsString, useQueryState } from "nuqs";
import React from "react";

const clanOptions = [
  {
    name: "My Clan",
    value: "my-clan",
  },
  {
    name: "Search Clan",
    value: "search-clan",
  },
  {
    name: "Top Clans",
    value: "top-clans",
  },
  {
    name: "Create Clan",
    value: "create-clan",
  },
];

const Toggle = () => {
  const [clanOption, setClanOption] = useQueryState(
    "clan-option",
    parseAsString.withDefault("my-clan")
  );
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = (e.target as HTMLDivElement).getAttribute(
      "data-clan-option"
    );
    setClanOption(option);
  };
  return (
    <div
      className="w-full h-10 font-semibold gap-2 flex items-center"
      onClick={handleToggle}
    >
      {clanOptions.map(({ name, value }) => {
        return (
          <button
            key={value}
            className={`${
              value == clanOption ? "bg-active" : ""
            } rounded-lg px-2 py-1`}
            data-clan-option={value}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default Toggle;
