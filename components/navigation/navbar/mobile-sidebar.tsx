import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  // SheetDescription,
  // SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import MobileNavLinks from "./mobileNavlinks";

const MobileSidebar = () => {
  return (
    <Sheet >
      <SheetTrigger asChild className="md:hidden">
        <Image
          src="/icons/hamburger.svg"
          alt="hamburger menu icon"
          width={30}
          height={30}
          className="cursor-pointer invert-colors object-contain   "
        />
      </SheetTrigger>
      <SheetContent side="left" className=" w-[300px]">
        <SheetTitle className="mt-5 px-3 ">
          <Link href={ROUTES.HOME} className="cursor-pointer">
            <SheetClose>
              <Image
                src="/images/Logo-dark.svg"
                alt={"creative overflow logo dark"}
                width={200}
                height={200}
                className="block dark:hidden object-contain"
              />
              <Image
                src="/images/Logo-light.svg"
                alt={"creative overflow logo dark"}
                width={200}
                height={200}
                className="hidden dark:block object-contain"
              />
            </SheetClose>
          </Link>
        </SheetTitle>
        <div className="flex flex-col overflow-y-auto no-scrollbar justify-between h-[calc(100vh-80px)] ">
          <SheetClose asChild>
            <section className="flex flex-col h-full gap-8 pt-4 px-2">
              <MobileNavLinks />
            </section>
          </SheetClose>
        </div>

        <SheetFooter className=" w-full flex flex-col gap-2 p-3 justify-center items-center">
          <Link href={ROUTES.SIGNIN}>
            <SheetClose asChild>
              <Button className="w-[280px] bg-light-700 dark:bg-dark-300 ">
                <p className="dark:dark-text-gradient light-text-gradient body-bold">
                  Sign In
                </p>
              </Button>
            </SheetClose>
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <SheetClose asChild>
              <Button className="w-[280px] bg-light-700 dark:bg-dark-200">
                <span className="text-dark100_light900 body-regular">
                  Sign Up
                </span>
              </Button>
            </SheetClose>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
