import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./Navlinks";

const MobileSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Image
          src="/icons/hamburger.svg"
          alt="hamburger menu icon"
          width={24}
          height={24}
          className="cursor-pointer invert-colors object-contain"
        />
      </SheetTrigger>
      <SheetContent side="left" className=" w-[300px]">
        <SheetTitle className="mt-5 px-3 ">
          <Link href={ROUTES.HOME} className="cursor-pointer">
            <SheetClose>
              <Image
                src="/images/Logo.png"
                alt="creative overflow logo"
                width={160}
                height={32}
                className="block dark:hidden object-contain"
                priority
              />
              <Image
                src="/images/dark-logo.png"
                alt="creative overflow logo"
                width={160}
                height={32}
                className="hidden dark:block object-contain"
                priority
              />
            </SheetClose>
          </Link>
        </SheetTitle>
        <div className="flex flex-col overflow-y-auto no-scrollbar justify-between h-[calc(100vh-80px)] ">
          <SheetClose asChild>
            <section className="flex flex-col h-full gap-8 pt-4 px-2">
              <NavLinks userId={userId} isMobileNav={true} />
            </section>
          </SheetClose>
        </div>{" "}
        <SheetFooter className="w-full flex flex-col gap-3 p-4 justify-center items-center">
          {userId ? (
            <form action={handleSignOut} className="w-full">
              <Link href={ROUTES.HOME} className="w-full">
                <SheetClose asChild>
                  <Button className="w-full background-light800_dark400 light-border-2 hover:background-light700_dark300 transition-colors mb-10 h-10 cursor-pointer">
                    <p className="text-white body-semibold">logout</p>
                  </Button>
                </SheetClose>
              </Link>
            </form>
          ) : (
            <>
              <Link href={ROUTES.SIGNIN} className="w-full">
                <SheetClose asChild>
                  <Button className="w-full bg-primary-500 hover:bg-primary-500/90 transition-colors cursor-pointer">
                    <p className="text-white body-semibold">Sign In</p>
                  </Button>
                </SheetClose>
              </Link>
              <Link href={ROUTES.SIGNUP} className="w-full">
                <SheetClose asChild>
                  <Button className="w-full background-light800_dark400 light-border-2 hover:background-light700_dark300 transition-colors cursor-pointer">
                    <span className="text-dark100_light900 body-medium">
                      Sign Up
                    </span>
                  </Button>
                </SheetClose>
              </Link>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
