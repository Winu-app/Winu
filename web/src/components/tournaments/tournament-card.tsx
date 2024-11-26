"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/logo";

const TournamentCard = ({
  image,
  _id,
  name,
  host,
  isActive,
  type,
}: {
  image: string;
  _id: string;
  name: string;
  host: any;
  isActive: boolean;
  type: "MY_TOURNAMENTS" | "ALL_TOURNAMENTS";
}) => {
  return (
    <Link
      href={
        type === "ALL_TOURNAMENTS"
          ? `/tournaments/${_id}`
          : `/tournament/edit/${_id}`
      }
      className="relative border rounded-lg border-active shrink-0 no-scrollbar h-full w-full bg-foreground flex flex-col items-center overflow-hidden cursor-pointer"
    >
      <div className="w-full h-60 rounded-t-lg flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={1}
            height={1}
            className="size-full object-cover"
          />
        ) : (
          <Logo className="size-full" />
        )}
      </div>
      <div className="absolute size-full flex flex-col bg-gradient-to-bl from-transparent to-foreground justify-between p-2">
        <div className="w-full items-start justify-between text-xs flex flex-col">
          <div className="flex size-full justify-between">
            <p className="text-lg font-semibold">{name}</p>
            {isActive ? (
              <div className="flex items-center gap-1 text-green-400">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <p>live</p>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-orange-400">
                <div className="size-2 rounded-full bg-orange-500" />
                <p>closed</p>
              </div>
            )}
          </div>
          <p className="text-xs hover:underline hover:text-purple w-fit">
            @{host?.username}
          </p>
        </div>
        <div>
          <div className="flex gap-2 py-2">
            <div className="size-6 rounded-full bg-red-50"></div>
            <p className="font-semibold">PUBG</p>
          </div>
          <div className="w-full flex items-center ">
            <div className="size-6 rounded-full bg-red-50"></div>
            <div className="size-6 rounded-full bg-red-50"></div>
            <div className="size-6 rounded-full bg-red-50"></div>
            <div className="size-6 rounded-full bg-red-50"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
