import Link from "next/link";
import React from "react";

const Auth = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-8">
      <p className="text-xl font-semibold">User not found!</p>
      <div className="flex gap-10">
        <Link
          href="/register"
          className="px-10 py-2 bg-white rounded-lg text-black font-semibold"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="px-10 py-2 bg-white rounded-lg text-black font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Auth;
