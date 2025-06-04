import Image from "next/image";
import Link from "next/link";
import React from "react";

import MobileSidebar from "@/components/navigation/navbar/mobile-sidebar";

import Theme from "./theme";
import { Input } from "../../ui/input";
const Navbar = () => {
  return (
    <nav className="flex-between  bg-light-850 dark:bg-dark-300 fixed w-full z-50 gap-5 p-5 shadow-dark-200 dark:shadow-none sm:px-12 ">
      <Link href="/" className=" items-center gap-1.5 sm:hidden">
        <Image
          src="/images/site-logo.svg"
          alt={"creative overflow logo"}
          width={35}
          height={35}
          className="block sm:hidden"
        />
      </Link>
      <Link href="/" className=" items-center gap-1.5 hidden sm:flex">
        <Image
          src="/images/Logo-dark.svg"
          alt={"creative overflow logo dark"}
          width={220}
          height={220}
          className="block dark:hidden object-contain "
        />
        <Image
          src="/images/Logo-light.svg"
          alt={"creative overflow logo dark"}
          width={220}
          height={220}
          className="hidden dark:block object-contain "
        />
      </Link>
      <div className="flex items-center gap-2 min-w-[600px] light-border background-light800_dark400 rounded-2xl px-3 py-1 shadow-lg dark:shadow-none">
      <Image
        src="/icons/search.svg"
        alt="search icon"
        width={20}
        height={20}
        className="invert-colors object-contain ml-2 cursor-pointer "
      />
      <Input className="no-focus border-none !bg-transparent" />
      
      </div>
      <div className="flex  flex-row gap-5 justify-between">
        <Theme />
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
