import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link
        href="/login"
        className="px-10 py-2 bg-white rounded-lg text-black font-semibold"
      >
        Sign In
      </Link>
    </div>
  );
};

export default SignIn;
