import Image from "next/image";
import React from "react";
import Logo from "../ui/logo";

const Header = ({
  image,
  name,
  description,
  entryFee,
}: {
  image: string;
  name: string;
  description: string;
  entryFee: string;
}) => {
  return (
    <div className="w-full h-60 overflow-hidden rounded-lg bg-active relative shrink-0">
      {image ? (
        <Image
          src={image}
          alt="tournament"
          width={1}
          height={1}
          className="size-full object-cover"
        />
      ) : (
        <Logo className="size-full" />
      )}
      <div className="absolute size-full flex flex-col items-center justify-between bg-gradient-to-bl from-[rgba(0,0,0,0.1)] to-foreground top-0 left-0 px-4 py-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-xs text-gray-400 w-[70%]">
              {description} Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Magni atque aliquam dolores dolorem vel delectus deleniti
              fugiat praesentium. Accusamus sed doloribus qui magnam quaerat
              eius deleniti possimus debitis dolor commodi.
            </p>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            <p>live</p>
          </div>
        </div>
        <div className="w-full items-end justify-end flex font-semibold">
          Entry Fee:
          <span className="text-orange-400 ml-1">{entryFee} Coins</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
