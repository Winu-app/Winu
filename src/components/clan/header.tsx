import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [showClan, setShowClan] = useQueryState("clan-modal", parseAsBoolean);

  return (
    <div className="flex w-full justify-between items-center ">
      <h2 className="font-semibold">Clan</h2>
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
