import Image from "next/image";
import React from "react";
import Logo from "../ui/logo";
import { GiTwoCoins } from "react-icons/gi";

const Header = ({
  image,
  name,
  description,
  entryFee,
  isActive,
}: {
  image: string;
  name: string;
  description: string;
  entryFee: string;
  isActive: boolean;
}) => {
  return (
    <div className="w-full h-60 overflow-hidden rounded-lg bg-active relative shrink-0">
      {image ? (
        <div className="size-full p-1 rounded-lg">
          <Image
            src={image}
            alt="tournament"
            width={1}
            height={1}
            className="size-full object-cover border border-active rounded-md"
          />
        </div>
      ) : (
        <Logo className="size-full" />
      )}
      <div className="absolute size-full flex flex-col items-center justify-between bg-gradient-to-bl from-[rgba(0,0,0,0.1)] to-foreground top-0 left-0 px-4 py-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-xs text-gray-400 w-[70%]">{description}</p>
          </div>
          {isActive ? (
            <div className="flex items-center gap-1 text-green-400">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <p>live</p>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-orange-400">
              <div className="size-2 rounded-full bg-orange-500 animate-pulse" />
              <p>closed</p>
            </div>
          )}
        </div>
        <div className="w-fit items-center justify-center flex font-semibold bg-[rgba(100,100,100,0.3)] px-4 py-1.5 rounded-md gap-1">
          <p>Bid Amount:</p>
          <span className="text-orange-400">{entryFee}</span>
          <GiTwoCoins size={20} className="text-orange-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
