"use client";
import React, { useEffect } from "react";
import { FaGamepad, FaUserAstronaut } from "react-icons/fa";
import NavItem from "./nav-item";
import { GiWallet } from "react-icons/gi";
import { HiViewGridAdd } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getUserWithAuthToken } from "src/actions/user/get-user-with-auth-token";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "src/state-manager/features/user";

const items = [
  // {
  //   name: "Home",
  //   icon: HiMiniHome,
  //   link: "/home",
  //   iconSize: 20,
  // },
  {
    name: "Tournaments",
    icon: FaGamepad,
    link: "/tournaments",
    iconSize: 20,
  },
  {
    name: "Wallet",
    icon: GiWallet,
    link: "/wallet",
    iconSize: 18,
  },
  {
    name: "My Tournaments",
    icon: HiViewGridAdd,
    link: "/my-tournaments",
    iconSize: 18,
  },
  {
    name: "Profile",
    icon: FaUserAstronaut,
    link: "/profile",
    iconSize: 18,
  },
];

const Navbar = () => {
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getUserWithAuthToken(),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    if (data.message === "token not found") {
      toast.error("Authentication failed");
      router.push("/");
      return;
    }
    if (!data?.user._id) {
      toast.error("Authentication failed");
      router.push("/");
      return;
    } else {
      dispatch(setUser(data.user));
    }
  }, [data]);
  return (
    <div className="fixed bottom-8 h-16 pointer-events-none flex w-full items-center justify-center z-50">
      <nav className="px-4 py-1.5 rounded-full bg-active flex items-center justify-center pointer-events-auto gap-1">
        {items.map(({ icon: Icon, link, name, iconSize }, idx) => {
          return (
            <NavItem
              idx={idx}
              link={link}
              name={name}
              key={`nav-${idx}-${name}`}
            >
              <Icon size={iconSize} />
            </NavItem>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
