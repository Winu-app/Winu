import Image from "next/image";
import React from "react";

const PlayerCard = () => {
  return (
    <div className="size-28 flex items-center justify-center flex-col">
      <div className="size-16 rounded-full bg-active border overflow-hidden">
        <Image
          src="https://i.pinimg.com/236x/f5/1d/0a/f51d0a59def3381376fbbb99fb7c4825.jpg"
          width={1}
          height={1}
          className="size-full object-cover"
          alt="Leader"
        />
      </div>
      <div className="px-2 py-0.5 bg-active rounded-lg text-xs text-center">
        <p>Name</p>
        <p className="text-[0.6rem]">Leader</p>
      </div>
    </div>
  );
};

export default PlayerCard;
