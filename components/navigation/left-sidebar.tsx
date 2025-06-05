"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button as UIButton } from "@/components/ui/button"; 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "@/constants";
import ROUTES from "@/constants/routes";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon" 
      className="sticky top-[77px] h-[calc(100vh-77px)] 
                 border-r border-light-700 dark:border-dark-400
                 background-light900_dark300
                 !p-0" 
    >
      <SidebarContent className="flex flex-col pt-4 pl-4 pr-4 custom-scrollbar"> {/* Added p-3 for content padding */}
        {/* Optional: Custom Toggle Button if the default trigger mechanism isn't used or needs specific placement */}
        {/* This button mimics your original toggle button's style and position relative to the sidebar content */}
        <div className="hidden md:block absolute top-15 -right-[15px] z-20 "> {/* Adjusted positioning */}
          <UIButton
            variant="outline"
            size="icon"
            className="rounded-full p-2 h-10 w-7
                       bg-background hover:bg-accent
                       border border-border "
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </UIButton>
        </div>
        
        <SidebarMenu className="mt-10 flex flex-col gap-6"> 
          {sidebarLinks.map((link) => {
            const { route, label, imgURL } = link;
            let href = route;

            if (route === "/profile") {
              const userId = "1"; // Placeholder: Replace with actual user ID logic
              if (userId) {
                href = `${route}/${userId}`;
              } else {
              
              }
            }

            const isActive =
              (pathname.includes(href) && href.length > 1) || pathname === href;

            return (
              <SidebarMenuItem key={label} className="p-0"> {/* Remove padding from item if button has it */}
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`w-full justify-start items-center gap-4 p-5 rounded-lg text-dark100_light900 !body-medium
                    ${isActive
                      ? "primary-gradient-light dark:primary-gradient-dark !body-bold !text-light-900" 
                      : "text-dark300_light900 hover:bg-light-800 dark:hover:bg-dark-400" 
                    }
                  `}
                >
                  <Link href={href}>
                    <Image
                      src={imgURL}
                      alt={label}
                      width={25} // SidebarMenuButton default icon size is 16px (size-4)
                      height={25}
                      className={`${isActive ? "" : "invert-colors"}`} 
                    />
        
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto pb-0 lg:pb-10 border-t border-light-700 dark:border-dark-400">
        <div className="flex flex-col gap-2">
          <SidebarMenuButton
            asChild
            variant="outline" 
            className="w-full justify-start items-center gap-3 py-5 px-3 rounded-lg bg-primary-500 text-white hover:bg-primary-500/90"
          >
            <Link href={ROUTES.SIGNIN}>
              <Image src="/icons/account.svg" alt="Sign In" width={20} height={20} />
              <span>Sign In</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton
            asChild
            variant="outline" // Or your custom variant/styling
            className="w-full justify-start items-center gap-3 p-3 rounded-lg"
            // Apply custom styles to match original Button
          >
            <Link href={ROUTES.SIGNUP}>
              <Image src="/icons/sign-up.svg" alt="Sign Up" width={20} height={20} className="invert-colors" />
              <span>Sign Up</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}