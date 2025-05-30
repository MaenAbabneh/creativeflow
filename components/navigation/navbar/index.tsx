import Image from "next/image";
import Link from "next/link";
import React from "react";

import MobileSidebar from "@/components/navigation/navbar/mobile-sidebar";

import Theme from "./theme";
import { Input } from "../../ui/input";
const Navbar = () => {
  return (
    <nav className="flex-between  background-light800_dark300 fixed w-full z-50 gap-5 p-5 shadow-light-300 dark:shadow-none sm:px-12 ">
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
        {/* <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Creative <span className="dark:dark-text-gradient-logo light-text-gradient">Overflow</span>
        </p> */}
      </Link>
      <Input className=" w-5" />
      <div className="flex  flex-row gap-5 justify-between">
        <Theme />
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
