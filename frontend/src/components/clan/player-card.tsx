import Image from "next/image";
import React from "react";
import Logo from "../ui/logo";

const PlayerCard = ({
  name,
  position,
  image,
}: {
  name: string;
  position: "Leader" | "Member" | "Co-Leader";
  image?: string;
}) => {
  return (
    <div className="size-28 flex items-center justify-center flex-col">
      <div className="size-16 rounded-full bg-active border overflow-hidden">
        {!image && <Logo className="size-full" />}
        {image && (
          <Image
            src={image}
            width={1}
            height={1}
            className="size-full object-cover"
            alt="Leader"
          />
        )}
      </div>
      <div className="px-2 py-0.5 bg-active rounded-lg text-xs text-center">
        <p>{name}</p>
        <p className="text-[0.6rem]">{position}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
