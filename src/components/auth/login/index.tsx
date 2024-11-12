"use client";
import React, { useState, useTransition } from "react";
import InputField from "../input-field";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Header from "../header";
import Footer from "../footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const login = () => {
    if (!email) {
      toast.error("email is missing!");
      return;
    }

    if (!password) {
      toast.error("password is missing!");
      return;
    }
    const body = {
      email,
      password,
    };
    startTransition(async () => {
      try {
        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          toast.success("Login successful");
          router.push("/tournaments");
        } else {
          const data = await res.json();
          toast.error(JSON.stringify(data.message));
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit h-fit pt-4 pb-10 px-10 rounded-lg bg-active flex flex-col gap-4">
        <Header
          subtitle="Welcome back! Please sign in to continue"
          title="Login to Winu"
        />
        <form className="size-full flex items-center justify-center flex-col gap-4">
          <InputField
            placeholder="sub@gmail.com"
            value={email}
            setValue={setEmail}
            fieldName="Email"
            type="email"
          />
          <InputField
            placeholder="*******"
            value={password}
            setValue={setPassword}
            fieldName="Password"
            type="password"
          />
          <button
            className="w-full bg-white text-black rounded-lg py-1.5 font-semibold mt-4 active:scale-95 transition-transform items-center flex justify-center h-10 disabled:bg-gray-200 disabled:scale-100 disabled:cursor-not-allowed"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
          <Footer
            message="Don’t have an account?"
            link="/register"
            linkText="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
