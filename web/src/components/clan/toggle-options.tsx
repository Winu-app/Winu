import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect } from "react";

const clanOptions = [
  {
    name: "My clan",
    value: "my-clan",
  },
  // {
  //   name: "Search clan",
  //   value: "search-clan",
  // },
  // {
  //   name: "Top clans",
  //   value: "top-clans",
  // },
  {
    name: "Create clan",
    value: "create-clan",
  },
];

const ToggleOptions = () => {
  const [clanOption, setClanOption] = useQueryState(
    "clan-option",
    parseAsString
  );
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = (e.target as HTMLDivElement).getAttribute(
      "data-clan-option"
    );
    if (!option) return;
    setClanOption(option);
  };

  useEffect(() => {
    setClanOption("my-clan");
  }, []);
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

export default ToggleOptions;
