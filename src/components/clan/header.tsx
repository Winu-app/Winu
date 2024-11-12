import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";
import { IoClose } from "react-icons/io5";
import ToggleOptions from "./toggle-options";

const Header = () => {
  const [_, setShowClan] = useQueryState("clan-modal", parseAsBoolean);

  return (
    <div className="flex w-full justify-between items-center ">
      <ToggleOptions />
      <button
        className="rounded-full hover:bg-active flex items-center justify-between p-1"
        onClick={() => setShowClan(false)}
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Header;
