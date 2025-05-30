"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";

const MobileNavLinks = () => {
  const pathname = usePathname();
  const userId = 1; // Replace with actual user ID logic
  return (
    <>
      {sidebarLinks.map((link) => {
        const { route, label, imgURL } = link;
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;
        if (route === "/profile") {
          if (userId) link.route = `${route}/${userId}`;
          else return null; // Skip rendering if userId is not available
        }
        return (
          <SheetClose asChild key={label}>
            <Link
              key={label}
              href={route}
              className={`${isActive ? "dark:primary-gradient-dark primary-gradient-light rounded-lg flex gap-6 items-center flex-start py-4 mx-3" : "text-dark300_light900 rounded-lg"} "flex items-center gap-6 flex-start px-4 py-2 rounded-lg"`}
            >
              <Image
                src={imgURL}
                alt={label}
                width={24}
                height={24}
                className="invert-colors transition-all duration-300 ease-in-out"
              />
              <span
                className={`${
                  isActive ? "body-semibold" : "body-medium"
                }   transition-all  ease-in-out`}
              >
                {label}
              </span>
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
};

export default MobileNavLinks;
