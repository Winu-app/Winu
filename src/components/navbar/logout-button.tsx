"use client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

const UserProfile = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const logout = () => {
    startTransition(async () => {
      const domain = process.env.DOMAIN;
      const res = await fetch(`${domain}/api/logout`, {
        method: "POST",
      });
      if (res.status === 200) {
        router.replace("/");
        toast.success("Logged out!");
      }
    });
  };
  return (
    <button
      className={`size-6 rounded-full bg-white flex items-center justify-center relative group hover:bg-dark `}
      type="button"
      onClick={logout}
    >
      <div className="absolute top-0 bg-active px-2 py-0.5 rounded-full text-xs group-hover:-top-8 transition-all opacity-0 group-hover:opacity-100 pointer-events-none">
        logout
      </div>
    </button>
  );
};

export default UserProfile;
