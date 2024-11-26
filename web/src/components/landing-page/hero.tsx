"use client";

import Image from "next/image";
import { FaTeamspeak, FaTrophy } from "react-icons/fa";
import {
  GiBloodySword,
  GiGoldBar,
  GiM3GreaseGun,
  GiShotgunRounds,
  GiWhistle,
  GiMachineGun,
  GiSwordsEmblem,
  GiSentryGun,
} from "react-icons/gi";
import { IoLogoGameControllerB } from "react-icons/io";
import { TbSwords } from "react-icons/tb";
import Logo from "../ui/logo";
import Link from "next/link";

import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className="pt-20 w-screen h-screen overflow-hidden sticky top-0">
      <div className="w-full h-full justify-center flex absolute -z-10 after:w-full after:h-full after:-z-[9] after:absolute after:bg-[black] after:blur-3xl">
        <Image
          src="/landing-page/mesh.svg"
          width={100}
          height={100}
          alt="background image"
          className="w-[80%] ml-32 h-[65%] select-none max-md:w-full max-md:ml-10"
        />
      </div>
      <div className="w-full h-full flex justify-between absolute z-10">
        <div className="w-96 h-full relative  blur-[2px]">
          <TbSwords
            size={44}
            className="absolute left-[20%] top-[40%] -rotate-12 max-md:left-0"
          />
          <IoLogoGameControllerB
            size={60}
            className="absolute right-[20%] top-[5%] rotate-12"
          />
          <GiBloodySword
            size={80}
            className="absolute right-[20%] bottom-[20%]"
          />
        </div>
        <div className="w-96 h-full relative blur-[2px]">
          <FaTeamspeak
            size={60}
            className="absolute right-[20%] top-[40%] rotate-12 max-md:right-0"
          />
          <GiM3GreaseGun
            size={100}
            className="absolute left-[20%] top-[5%] -rotate-45 "
          />
          <FaTrophy
            size={60}
            className="absolute left-[20%] bottom-[20%] -rotate-12"
          />
        </div>
      </div>
      <div className="w-full h-full gap-12 flex pb-20 justify-center flex-col items-center absolute z-30 ">
        <div className="w-[40rem] h-[18rem] relative flex flex-col gap-10 text-center items-center max-md:w-[20rem]">
          <div className="flex flex-col gap-4 max-md:gap-10 items-center ">
            <div className="bg-purple pl-2 pr-4 py-0.5 rounded-full font-semibold  flex items-center justify-center gap-1">
              <Logo className="animate-spin [animation-duration:2s]" />
              WINU
            </div>
            <p className="text-[2.8rem] leading-tight max-md:text-3xl font-semibold">
              Compete, Conquer, Win⚔️
            </p>
            <p className="text-sm text-[#cecece] leading-4 max-md:w-72">
              Unleash your inner strategist, build your dream team, and <br />
              win big with WINU!
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              href="/tournaments"
              className="px-6 py-2 rounded-xl bg-gray-100 text-black font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Explore
              <GiShotgunRounds size={24} />
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 rounded-xl bg-gray-100 text-black font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Login
              <GiSentryGun size={24} />
            </Link>
          </div>
        </div>
        <div
          className={` overflow-hidden relative w-[calc(100px*5)] max-md:w-[calc(50px*5)] before:bg-gradient-linear-to-r before:h-full before:w-[15%] before:z-10 before:absolute before:-right-4 before:top-0 after:absolute after:w-[15%] after:h-full after:bg-gradient-linear-to-l after:z-10 after:top-0 after:-left-4 whitespace-nowrap flex items-center h-5 ${styles.slide_wrap}`}
        >
          <ul
            className={`inline-block text-xs items-center ${styles.logo_slide}`}
          >
            <div className="flex gap-8 ml-8">
              <li className="flex gap-1">
                <FaTeamspeak size={16} strokeWidth={1} />
                Fantasy Teams
              </li>
              <li className="flex gap-1">
                <GiGoldBar size={16} strokeWidth={1} />
                100x Rewards
              </li>
              <li className="flex gap-1">
                <GiWhistle size={16} strokeWidth={1} />
                Host-Driven Tournaments
              </li>
              <li className="flex gap-1">
                <GiMachineGun size={16} strokeWidth={1} /> Breathtaking
                competitions
              </li>
              <li className="flex gap-1">
                <GiSwordsEmblem size={16} strokeWidth={1} />
                Team Alliance
              </li>
            </div>
          </ul>
          {/* Copy of same items */}
          <ul
            className={`inline-block  text-xs items-center ${styles.logo_slide}`}
          >
            <div className="flex gap-8 ml-8">
              <li className="flex gap-1">
                <FaTeamspeak size={16} strokeWidth={1} />
                Fantasy Teams
              </li>
              <li className="flex gap-1">
                <GiGoldBar size={16} strokeWidth={1} />
                100x Rewards
              </li>
              <li className="flex gap-1">
                <GiWhistle size={16} strokeWidth={1} />
                Host-Driven Tournaments
              </li>
              <li className="flex gap-1">
                <GiMachineGun size={16} strokeWidth={1} /> Breathtaking
                competitions
              </li>
              <li className="flex gap-1">
                <GiSwordsEmblem size={16} strokeWidth={1} />
                Team Alliance
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
