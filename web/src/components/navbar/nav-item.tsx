"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({
  link,
  name,
  children,
}: {
  link: string;
  idx: number;
  name: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <Link
      href={link}
      className={`w-8 h-6 flex items-center justify-center relative group hover:bg-dark rounded-lg ${
        path === link ? "bg-dark" : ""
      }`}
    >
      <p className="absolute top-0 bg-active px-2 py-0.5 rounded-full text-xs group-hover:-top-8 transition-all opacity-0 group-hover:opacity-100 pointer-events-none text-nowrap">
        {name}
      </p>
      {children}
    </Link>
  );
};

export default NavItem;
