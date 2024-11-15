import React from "react";
import Logo from "../ui/logo";

const Header = ({ subtitle, title }: { title: string; subtitle: string }) => {
  return (
    <div className="size-full flex items-center justify-center flex-col py-2 gap-1">
      <div className="flex gap-1 items-center justify-center">
        <h3 className="font-semibold">{title}</h3>
        <Logo size={18} />
      </div>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
};

export default Header;
