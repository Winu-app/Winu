import React from "react";
import Logo from "../ui/logo";

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
      className="flex items-center justify-between cursor-pointer gap-2 mx-2"
      data-player-id={_id}
      data-player-username={username}
      data-player-imageUrl={imageUrl}
    >
      <div className="flex gap-2">
        <div className="size-10 rounded-full overflow-hidden border border-active flex items-center justify-center">
          <Logo className="size-full" />
        </div>
        <div className="text-xs">
          <p>{username}</p>
          <p className="text-[0.6rem] text-gray-300">{role}</p>
        </div>
      </div>
      <div>
        <input
          className="size-12 bg-transparent border-b outline-none border-active "
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default PlayerCard;
