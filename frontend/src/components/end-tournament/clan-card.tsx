import React from "react";
import Logo from "../ui/logo";
import { Clan, User } from "src/types";
import PlayerCard from "./player-card";

export type ClanCardProps = Omit<Clan, "leader" | "members"> & {
  _id: string;
  leader: User & { _id: string };
  members: Array<User & { _id: string }>;
};

const ClanCard = ({
  name,
  uniqueName,
  _id,
  imageUrl,
  leader,
  members,
}: ClanCardProps) => {
  return (
    <div className="w-80 min-h-96 h-fit rounded-lg bg-[#202020] overflow-hidden flex flex-col gap-2">
      {/* Header */}
      <div className="w-full h-12 px-4 bg-active flex items-center gap-2">
        <div className="size-10 rounded-full flex items-center justify-center border border-[#202020]">
          <Logo className="size-full" />
        </div>
        <div>
          <p className="text-lg">{name}</p>
          <p className="text-xs text-gray-400 -mt-2">{uniqueName}</p>
        </div>
      </div>
      {/* Leader */}
      <PlayerCard
        _id={leader._id}
        imageUrl={leader.profileImage}
        role={"Leader"}
        username={leader.username}
      />
      {/* Members */}
      <div className="w-full flex items-center justify-center p-2 flex-wrap gap-2">
        {members.map(({ username, profileImage, _id }) => {
          return (
            <PlayerCard
              _id={_id}
              imageUrl={profileImage}
              role={"Member"}
              username={username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClanCard;
