"use client";
import React, { useTransition } from "react";
import { logout } from "../../actions/user/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const LogoutButton = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await logout();
      if (res.message === "Logged out successfully!") {
        queryClient.invalidateQueries({
          queryKey: ["current-user", "my-clan", "my-tournament-list"],
        });
        // router.replace("/");
        // toast.info(res.message);
      }
    });
  };
  return (
    <button
      className="w-fit flex items-center justify-center text-black px-4 py-1 font-semibold rounded-full bg-white active:scale-95 transition-transform disabled:bg-gray-300 disabled:cursor-not-allowed"
      onClick={handleLogout}
      disabled={loading}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
