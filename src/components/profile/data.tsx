import Link from "next/link";
import React from "react";
import { IoLinkOutline, IoLocationOutline } from "react-icons/io5";
import { TbMilitaryRank } from "react-icons/tb";

const Data = () => {
  return (
    <div className="w-full h-fit flex flex-col px-4 py-2 gap-2 border-b border-active">
      <div className="w-full flex items-start flex-col justify-start">
        <p className="font-semibold text-2xl">Subhash</p>
        <p className="text-xs text-gray-300">@realSubhash</p>
      </div>
      <div className="w-full flex text-sm items-center gap-6">
        <div className="flex gap-1 items-center">
          <TbMilitaryRank size={18} className="text-gray-400" />
          22
          <span className="text-gray-400">Rank</span>
        </div>
        <p>
          234 <span className="text-gray-400">Tournaments</span>
        </p>
      </div>
      <div className="w-full">
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          temporibus delectus odio laudantium harum ipsam accusamus? Laborum
          facere officia, provident dolorem doloremque aliquam dolore quidem in
          fugiat, fugit libero placeat.
        </p>
      </div>
      <div className="w-full flex gap-4 text-sm">
        <div className="w-fit flex items-center justify-start gap-1">
          <IoLinkOutline size={18} className="text-gray-400" />
          <Link
            href="#"
            target="_blank"
            className="hover:text-violet-500 hover:underline"
          >
            link
          </Link>
        </div>
        <div className="w-fit flex items-center justify-start gap-1">
          <IoLocationOutline size={18} className="text-gray-400" />
          <p>location</p>
        </div>
      </div>
      <div className="w-full flex gap-6 text-sm">
        <p>
          22 <span className="text-gray-400">Following</span>
        </p>
        <p>
          234 <span className="text-gray-400">Followers</span>
        </p>
      </div>
    </div>
  );
};

export default Data;
