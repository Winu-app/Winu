import React from "react";
import { FaGifts } from "react-icons/fa";

const PromotionalCard = () => {
  return (
    <div className="w-72 h-52 rounded-lg bg-foreground border border-active flex flex-col items-stretch justify-center p-2">
      <div className="size-full flex items-center justify-center gap-4 flex-col">
        <div className="p-2 rounded-md bg-active">
          <FaGifts size={18} />
        </div>
        <p className="text-sm">Promotional</p>
        <p className="text-2xl font-semibold">
          50
          <span className="text-sm text-orange-300"> coins</span>
        </p>
      </div>
      <button className="bg-white w-full text-black py-1 rounded-lg font-semibold">
        Invite and Earn
      </button>
    </div>
  );
};

export default PromotionalCard;
