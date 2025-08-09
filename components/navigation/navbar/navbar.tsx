import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import MobileRightSidebar from "@/components/navigation/navbar/mobile-right-sidebar"; // New: Right mobile sidebar
import MobileSidebar from "@/components/navigation/navbar/mobile-sidebar"; // Left mobile sidebar
import GlobalSearch from "@/components/search/globale-search";
import UserAvatar from "@/components/UserAvatar";

import Theme from "./theme";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark300 fixed w-full z-50 gap-5 p-4  shadow-light-100 dark:shadow-none">
      {/* Left Section: Logo & Mobile Left Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 sm:hidden">
          <Image
            src="/images/site-logo.svg"
            alt="Creative Overflow Logo"
            width={35}
            height={35}
            priority
          />
        </Link>
        <Link href="/" className="hidden sm:flex items-center gap-1.5">
          <Image
            src="/images/site-logo.svg"
            alt="Creative Overflow"
            width={30}
            height={30}
            className="object-contain"
            priority
          />
           <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Creative <span className="text-gradient dark:dark-text-gradient">Overflow</span>
        </p>
        
        </Link>
        {/* Mobile Left Sidebar Trigger (SheetTrigger is inside MobileSidebar) */}
        <MobileSidebar />
      </div>

      {/* Center Section: Search Bar (visible on sm and up) */}
      <div className="hidden sm:flex items-center gap-2 flex-1 mx-4 max-w-md lg:max-w-xl light-border-2 background-light800_darkgradient rounded-lg  shadow-light-100 dark:shadow-none">
      <GlobalSearch />
      </div>

      {/* Right Section: Theme Toggle & Mobile Right Sidebar Trigger */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Theme />
        {session?.user && (
          <UserAvatar
            id={session.user.id || ""}
            name={session.user.name || "User"}
            imageUrl={session.user.image || ""}
          />
        )}
        {/* Mobile Right Sidebar Trigger - visible on screens smaller than lg */}
        <div className="xl:hidden">
          <MobileRightSidebar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
