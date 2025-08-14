import Image from "next/image";

import RightSidebar from "@/components/navigation/rigth-sidebar"; // Import the main RightSidebar content
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileRightSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Replace with your desired icon for mobile right sidebar */}
        <Image
          src="/icons/more-dots.svg" // Example: ensure this icon exists in public/icons
          alt="Open right sidebar"
          width={28}
          height={28}
          className="cursor-pointer invert-colors-2"
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] p-0 overflow-y-auto custom-scrollbar background-light900_dark300"
      >
        <SheetTitle className="sr-only">
          Additional Information and Popular Tags
        </SheetTitle>
        <RightSidebar isMobileView={true} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileRightSidebar;
