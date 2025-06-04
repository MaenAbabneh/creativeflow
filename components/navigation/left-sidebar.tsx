"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import ROUTES from "@/constants/routes";

export default function LeftSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1280);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`
      h-screen sticky top-0 pt-20 transition-all duration-300
      border-r border-light-700 dark:border-dark-400
      background-light900_dark300
      ${isCollapsed ? "w-[80px]" : "w-[280px]"}
      hidden md:block
    `}
    >
      {/* Toggle button */}
      <button
        className="absolute top-24 -right-3 z-10 rounded-full p-1.5 background-light800_dark400 
                  border border-light-700 dark:border-dark-400 hidden lg:flex"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation links */}
      <div className="flex flex-col gap-6 px-4 mt-8">
        {sidebarLinks.map((link) => {
          const { route, label, imgURL } = link;
          let href = route;

          // Handle profile route
          if (route === "/profile") {
            const userId = 1; // Replace with actual user ID
            if (userId) href = `${route}/${userId}`;
            else return null;
          }

          const isActive =
            (pathname.includes(href) && href.length > 1) || pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all
                ${
                  isActive
                    ? "dark:primary-gradient-dark primary-gradient-light text-white"
                    : "text-dark300_light900 hover:background-light800_dark400"
                }
              `}
            >
              <div className="flex-shrink-0">
                <Image
                  src={imgURL}
                  alt={label}
                  width={24}
                  height={24}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
              </div>

              {!isCollapsed && (
                <span
                  className={`${isActive ? "font-semibold" : "font-medium"}`}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Authentication buttons */}
      <div className={`mt-auto px-4 py-6 ${isCollapsed ? "hidden" : "block"}`}>
        <div className="flex flex-col gap-3">
          <Link href={ROUTES.SIGNIN}>
            <Button className="w-full bg-primary-500 text-white">
              Sign In
            </Button>
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
