"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="w-full h-fit flex justify-start gap-2 items-center px-2 py-1 backdrop-blur-sm sticky top-0">
      <button
        onClick={goBack}
        className="rounded-full p-2 flex items-center justify-center hover:bg-active"
      >
        <IoMdArrowRoundBack />
      </button>
      <p className="text-xl font-semibold">WINU</p>
    </div>
  );
};

export default Header;
