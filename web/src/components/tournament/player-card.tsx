import React from "react";
import Logo from "../ui/logo";
import Image from "next/image";

const PlayerCard = ({
  imageUrl,
  username,
  role,
  _id,
}: {
  role: string;
  username: string;
  _id: string;
  imageUrl?: string;
}) => {
  return (
    <div
      className="flex gap-2 flex-col items-center cursor-pointer"
      data-player-id={_id}
      data-player-username={username}
      data-player-imageUrl={imageUrl}
    >
      <div className="size-12 rounded-full overflow-hidden border border-active flex items-center justify-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={username}
            width={1}
            height={1}
            className="size-full"
          />
        )}
        {!imageUrl && <Logo className="size-full" />}
      </div>
      <div className="text-xs text-center">
        <p>{username}</p>
        <p className="text-[0.6rem]">{role}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
