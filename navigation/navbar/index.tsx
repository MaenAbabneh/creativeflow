import Image from "next/image";
import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <nav className="flex-between dark:--color-dark-200 background-light900_dark200 fixed w-full z-50 gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          alt={"creative overflow logo"}
          width={23}
          height={23}
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Creative Overflow
        </p>
      </Link>
      <p className="max-sm:hidden">globsl search</p>
      <div className="flex-between gap-0">them</div>
    </nav>
  );
};

export default Navbar;
