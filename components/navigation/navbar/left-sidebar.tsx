"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  // SidebarGroupContent,
  SidebarMenu,
  // SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { sidebarLinks } from "@/constants";
import ROUTES from "@/constants/routes";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="light-border rounded-lg min-h-screen dark:bg-dark-400 bg-light-800 overflow-y-auto fixed z-50 top-[76px] shadow-lg dark:shadow-none"
    >
      <SidebarContent className="dark:bg-dark-300">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-col gap-6 mt-4">
              {sidebarLinks.map((link) => {
                const { route, label, imgURL } = link;
                const userId = 1; // Replace with actual user ID logic
                const isActive =
                  (pathname.includes(route) && route.length > 1) ||
                  pathname === route;
                if (route === "/profile") {
                  if (userId) link.route = `${route}/${userId}`;
                  else return null; // Skip rendering if userId is not available
                }
                return (
                  <Link
                    key={label}
                    href={route}
                    className={`${isActive ? "dark:primary-gradient-dark primary-gradient-light rounded-lg flex items-center flex-start py-[12px] px- " : "text-dark300_light900 rounded-lg"} "flex items-center gap-8 flex-start px-2 py-2 rounded-lg"`}
                  >
                    <Image
                      src={imgURL}
                      alt={label}
                      width={26}
                      height={26}
                      className="invert-colors transition-all duration-300 ease-in-out !min-w-[25px] !min-h-[25px] items-center justify-center ml-1"
                    />
                    <span
                      className={`${
                        isActive ? "body-semibold" : "body-medium"
                      }   transition-all  ease-in-out`}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-col gap-2 mt-22">
              {isExpanded ? (
                <div className="flex flex-col gap-2 ">
                  <Link href={ROUTES.SIGNIN}>
                    <Button className="w-[240px] bg-light-400 dark:bg-dark-200 ">
                      <p className="dark:light-text-gradient dark-text-gradient body-bold">
                        Sign In
                      </p>
                    </Button>
                  </Link>
                  <Link href={ROUTES.SIGNUP}>
                    <Button className="w-[240px] bg-light-700 dark:bg-dark-400">
                      <span className="text-dark100_light900 body-regular">
                        Sign Up
                      </span>
                    </Button>
                  </Link>
                </div>
              ) : null}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
