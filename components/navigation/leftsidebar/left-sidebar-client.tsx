"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useEffect } from "react";

import { Button as UIButton } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";

import NavLinks from "../navbar/Navlinks";

interface LeftSidebarClientProps {
  userId: string | null;
  signOutAction: () => Promise<void>;
  session: Session | null; // Adjust type as needed
}

const LeftSidebarClient = ({
  userId,
  signOutAction,
  session,
}: LeftSidebarClientProps) => {
  const { state, toggleSidebar, setOpen } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";
  const isProfilePage = pathname?.startsWith("/profile/");

  // Auto-collapse sidebar on profile pages
  useEffect(() => {
    if (isProfilePage && !isCollapsed) {
      setOpen(false);
    }
  }, [isProfilePage, isCollapsed, setOpen]);

  return (
    <Sidebar
      collapsible="icon"
      className="sticky top-[77px] h-[calc(100vh-77px)] 
                 border-r !border-light-700 dark:!border-dark-400
                 !background-light900_dark300
                 !p-0"
    >
      <SidebarContent className="flex flex-col pt-4 pl-4 pr-4 custom-scrollbar">
        {" "}
        {!isProfilePage && (
          <div className="hidden md:block absolute top-15 -right-[15px] z-20 ">
            {" "}
            <UIButton
              variant="outline"
              size="icon"
              className="rounded-full p-2 h-10 w-7
                         bg-background hover:bg-accent
                         border border-border "
              onClick={toggleSidebar}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </UIButton>
          </div>
        )}
        <SidebarMenu className="mt-6 flex flex-col gap-6">
          <NavLinks userId={userId} isSidebarNav={true} />
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto pb-0 lg:pb-10 border-t border-light-700 dark:border-dark-400">
        <div className="flex flex-col gap-2">
          {userId ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <form action={signOutAction} className="w-full">
                    <SidebarMenuButton
                      asChild
                      variant="outline"
                      className="w-full justify-start items-center gap-3 py-5 rounded-lg cursor-pointer"
                    >
                      <button
                        type="submit"
                        className="flex w-full items-center gap-3"
                      >
                        {session?.user && !isCollapsed && (
                          <UserAvatar
                            id={session.user.id || userId}
                            name={session.user.name || "User"}
                            imageUrl={session.user.image || ""}
                            className="h-6 w-6"
                          />
                        )}
                        <Image
                          src="/icons/logout.svg"
                          alt="Logout"
                          width={20}
                          height={20}
                          className="invert-colors-2"
                        />
                        <span>Logout</span>
                      </button>
                    </SidebarMenuButton>
                  </form>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>Logout</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      variant="outline"
                      className="w-full justify-start items-center gap-3 py-5 rounded-lg bg-primary-500 text-white hover:bg-primary-500/90"
                    >
                      <Link href={ROUTES.SIGNIN}>
                        <Image
                          src="/icons/account.svg"
                          alt="Sign In"
                          width={20}
                          height={20}
                        />
                        <span>Sign In</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>Sign In</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      variant="outline"
                      className="w-full justify-start items-center gap-3 py-5 rounded-lg"
                    >
                      <Link href={ROUTES.SIGNUP}>
                        <Image
                          src="/icons/sign-up.svg"
                          alt="Sign Up"
                          width={20}
                          height={20}
                          className="invert-colors"
                        />
                        <span>Sign Up</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>Sign Up</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default LeftSidebarClient;
