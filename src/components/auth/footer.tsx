import Link from "next/link";
import React from "react";

const Footer = ({
  link,
  linkText,
  message,
}: {
  link: string;
  linkText: string;
  message: string;
}) => {
  return (
    <div className="w-full flex items-center justify-center text-xs gap-1">
      <p>{message}</p>{" "}
      <Link href={link} className="hover:underline hover:text-blue-500">
        {linkText}
      </Link>
    </div>
  );
};

export default Footer;
