"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SheetClose } from "@/components/ui/sheet";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  userId?: string | null;
  isMobileNav?: boolean;
  isSidebarNav?: boolean;
}

const NavLinks = ({
  userId,
  isMobileNav = false,
  isSidebarNav = false,
}: NavLinksProps) => {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <>
      {sidebarLinks.map((link) => {
        const { route, label, imgURL } = link;
        let href = route;

        // Handle profile route
        if (route === "/profile") {
          if (userId) {
            href = `${route}/${userId}`;
          } else {
            return null;
          }
        }

        // Determine if link is active
        const isActive =
          pathname === href || (href !== "/" && pathname.startsWith(href));

        // Common link content
        const linkContent = (
          <>
            <Image
              src={imgURL}
              alt={label}
              width={isSidebarNav ? 25 : 24}
              height={isSidebarNav ? 25 : 24}
              className={cn(
                "transition-all duration-300 ease-in-out",
                !isActive && "invert-colors"
              )}
            />
            <span
              className={cn(
                "transition-all ease-in-out",
                isActive
                  ? isSidebarNav
                    ? "body-bold"
                    : "body-semibold"
                  : "body-medium"
              )}
            >
              {label}
            </span>
          </>
        );

        // For Left Sidebar
        if (isSidebarNav) {
          return (
            <SidebarMenuItem key={label} className="p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start items-center gap-4 p-5 rounded-lg text-dark100_light900 !body-medium",
                        isActive
                          ? "primary-gradient-light dark:primary-gradient-dark !body-bold !text-light-900"
                          : "text-dark300_light900 hover:bg-light-800 dark:hover:bg-dark-400"
                      )}
                    >
                      <Link href={href}>{linkContent}</Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          );
        }

        // Link component for mobile
        const LinkComponent = (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-6 flex-start px-4 py-2 rounded-lg transition-all duration-300 ease-in-out",
                    isActive
                      ? "dark:primary-gradient-dark primary-gradient-light rounded-lg flex gap-6 items-center flex-start py-4 mx-3"
                      : "text-dark300_light900 rounded-lg"
                  )}
                >
                  {linkContent}
                </Link>
              </TooltipTrigger>
              {!isMobileNav && (
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );

        // For Mobile Navigation
        return isMobileNav ? (
          <SheetClose asChild key={label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          LinkComponent
        );
      })}
    </>
  );
};

export default NavLinks;
