"use client";
import React, { useState, useTransition } from "react";
import Logo from "../../ui/logo";
import InputField from "../../ui/input-field";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Header from "../header";
import Footer from "../footer";

const Register = () => {
  const [displayname, setDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const register = () => {
    if (!username) {
      toast.error("username is missing!");
      return;
    }
    if (!email) {
      toast.error("email is missing!");
      return;
    }
    if (!displayname) {
      toast.error("display name is missing!");
      return;
    }
    if (!password) {
      toast.error("password is missing!");
      return;
    }
    const body = {
      name: displayname,
      username,
      email,
      password,
    };
    startTransition(async () => {
      try {
        const res = await fetch(`/api/sign-up`, {
          method: "POST",
          body: JSON.stringify(body),
        }).then(async (res) => await res.json());
        if (res) {
          toast.info(res.message);
        }
        if (res.user._id) {
          router.push("/login");
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
          subtitle="Welcome! Please fill in the details to get started."
          title=" Create your account "
        />
        <form className="size-full flex items-center justify-center flex-col gap-4">
          <InputField
            placeholder="Subhash"
            value={displayname}
            setValue={setDisplayname}
            fieldName="Display Name"
          />
          <InputField
            placeholder="realSubhash123"
            value={username}
            setValue={setUsername}
            fieldName="Username"
          />
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
              register();
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
            message="Already have an account?"
            link="/login"
            linkText="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
