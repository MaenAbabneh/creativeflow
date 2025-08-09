import React from "react";

import { auth } from "@/auth";
import GlobalSearch from "@/components/search/globale-search";
import UserAvatar from "@/components/UserAvatar";

import Logo from "./logo";
import MobileRightSidebar from "./mobile-right-sidebar";
import MobileSidebar from "./mobile-sidebar";
import Theme from "./theme";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark300 fixed w-full z-50 gap-5 p-4  shadow-light-100 dark:shadow-none">
      {/* Left Section: Logo & Mobile Left Sidebar Trigger */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo */}
        <Logo isMobile />

        {/* Desktop Logo */}
        <Logo />

        {/* Mobile Left Sidebar Trigger (SheetTrigger is inside MobileSidebar) */}
        <MobileSidebar />
      </div>

      {/* Center Section: Search Bar (visible on sm and up) */}
      <div className="hidden sm:flex items-center gap-2 flex-1 mx-4 max-w-md lg:max-w-xl light-border-2 background-light700_dark300 rounded-lg px-3 py-2 shadow-light-100 dark:shadow-none">
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
