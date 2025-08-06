import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import MobileRightSidebar from "@/components/navigation/navbar/mobile-right-sidebar"; // New: Right mobile sidebar
import MobileSidebar from "@/components/navigation/navbar/mobile-sidebar"; // Left mobile sidebar
import UserAvatar from "@/components/UserAvatar";

import { Input } from "../../ui/input";
import Theme from "./theme";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark300 fixed w-full z-50 gap-5 p-4  shadow-light-100 dark:shadow-none">
      {/* Left Section: Logo & Mobile Left Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <Link href="/" className="items-center gap-1.5 sm:hidden">
          <Image
            src="/images/site-logo.svg"
            alt="Creative Overflow Logo"
            width={35}
            height={35}
          />
        </Link>
        <Link href="/" className="items-center gap-1.5 hidden sm:flex">
          <Image
            src="/images/Logo-dark.svg"
            alt="Creative Overflow Logo Dark"
            width={200}
            height={40}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/images/Logo-light.svg"
            alt="Creative Overflow Logo Light"
            width={200}
            height={40}
            className="hidden dark:block object-contain"
          />
        </Link>
        {/* Mobile Left Sidebar Trigger (SheetTrigger is inside MobileSidebar) */}
        <MobileSidebar />
      </div>

      {/* Center Section: Search Bar (visible on sm and up) */}
      <div className="hidden sm:flex items-center gap-2 flex-1 mx-4 max-w-md lg:max-w-xl light-border-2 background-light800_dark400 rounded-lg px-3 py-2 shadow-light-100 dark:shadow-none">
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={18}
          height={18}
          className="invert-colors object-contain cursor-pointer"
        />
        <Input
          className="no-focus border-none !bg-transparent text-sm placeholder:text-light-500 dark:placeholder:text-dark-400"
          placeholder="Search questions, tags, users..."
        />
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
