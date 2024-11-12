"use client";
import Link from "next/link";
import React from "react";
import { GiMinigun } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center px-8 justify-between backdrop-blur-md text-sm fixed top-0 z-50">
      <div className="group py-2 relative px-6 bg-black cursor-pointer select-none">
        <div className="w-2 h-0.5 absolute top-0 right-0 bg-[#616160] group-hover:w-full transition-all" />
        <div className="w-2 h-0.5 absolute bottom-0 left-0 bg-[#616160] group-hover:w-full transition-all" />
        <div className="w-2 h-0.5 absolute top-0 left-0 bg-[#616160] " />
        <div className="w-2 h-0.5 absolute bottom-0 right-0 bg-[#616160] " />
        <div className="w-0.5 h-2 absolute top-0 right-0 bg-[#616160] " />
        <div className="w-0.5 h-2 absolute bottom-0 left-0 bg-[#616160] " />
        <div className="w-0.5 h-2 absolute top-0 left-0 bg-[#616160] group-hover:h-full transition-all" />
        <div className="w-0.5 h-2 absolute bottom-0 right-0 bg-[#616160] group-hover:h-full transition-all" />
        WINU
      </div>
      <div className="flex gap-10 ">
        <Link
          href="/register"
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-[#222222] text-white font-semibold active:scale-95 transition-transform"
        >
          <GiMinigun size={28} />
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
