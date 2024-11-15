import React from "react";
import { GiBeveledStar } from "react-icons/gi";

const Logo = ({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) => {
  return <GiBeveledStar size={size} className={className} />;
};

export default Logo;
