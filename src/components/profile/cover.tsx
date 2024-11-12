import Image from "next/image";
import React from "react";
import { FiCopy } from "react-icons/fi";

const Cover = () => {
  return (
    <div className="w-full h-fit">
      <div className="w-full h-60 overflow-hidden">
        <Image
          src="/logo-white.png"
          alt="logo"
          width={1}
          height={1}
          className="size-full object-contain bg-foreground"
        />
      </div>
      <div className="w-full h-40 -mt-28 px-6 flex items-end justify-between">
        <div className="size-32 rounded-full border border-active bg-foreground shrink-0 overflow-hidden">
          <Image
            src="/logo-white.png"
            alt="logo"
            width={1}
            height={1}
            className="size-full object-contain"
          />
        </div>
        <div className="w-full h-10 flex gap-4 justify-end">
          <button className="size-10 rounded-full bg-foreground border-active border flex items-center justify-center active:scale-95 transition-transform">
            <FiCopy size={18} />
          </button>
          <button className="w-fit flex items-center justify-center text-black px-4 py-1 font-semibold rounded-full bg-white active:scale-95 transition-transform">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cover;
