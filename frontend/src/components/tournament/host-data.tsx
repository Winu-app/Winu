import React from "react";
import { IoIosVideocam } from "react-icons/io";
import Link from "next/link";
import { getFormattedEndDate } from "../../helper/format-date";
import Image from "next/image";
import Logo from "../ui/logo";

const HostData = ({
  endDate,
  startDate,
  streamLink,
  host,
  hostImage,
}: {
  startDate: string;
  endDate: string;
  streamLink: string;
  host: string;
  hostImage: string;
}) => {
  const formattedStartDate = getFormattedEndDate(startDate);
  const formattedEndDate = getFormattedEndDate(endDate);

  return (
    <div className="h-40 w-full flex items-center justify-between -mt-16 relative px-3 gap-4">
      <div className="size-36 rounded-full shrink-0 bg-active overflow-hidden">
        {/* add image */}
        {hostImage ? (
          <Image
            src={hostImage}
            alt={host}
            width={1}
            height={1}
            className="size-full object-cover"
          />
        ) : (
          <Logo className="size-full" />
        )}
      </div>
      <div className="size-full flex items-center justify-between mt-4">
        <div className="size-full flex flex-col justify-center">
          <p className="text-xl font-semibold">@{host}</p>
          <Link
            rel="noopener noreferrer"
            href={streamLink || "#"}
            target="_blank"
            className="text-sm text-gray-400 hover:underline hover:text-purple flex gap-2 items-center w-fit"
          >
            <IoIosVideocam size={16} /> Stream link
          </Link>
        </div>
        <div className="shrink-0 flex flex-col justify-center text-xs text-gray-400">
          <p>Starts on: {formattedStartDate}</p>
          <p>Ends on &nbsp;: {formattedEndDate}</p>
        </div>
      </div>
    </div>
  );
};

export default HostData;
