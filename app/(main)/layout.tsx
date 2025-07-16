import LeftSidebar from "@/components/navigation/leftsidebar/left-sidebar";
import Navbar from "@/components/navigation/navbar/navbar";
import RightSidebar from "@/components/navigation/rigth-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen background-light850_dark200">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-[77px] ">
          <Navbar />
        </div>

        {/* Main Layout Container */}
        <div className="flex pt-[77px]">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content Area - Responsive spacing for sidebars */}
          <main
            className="flex-1 min-h-[calc(100vh-77px)] 
                         overflow-visible no-scrollbar
                         px-4 sm:px-6 py-6
                         xl:mr-[320px]
                         transition-all duration-200 ease-linear
                         relative z-10"
          >
            <div className="mx-auto max-w-none lg:max-w-4xl xl:max-w-full w-full">
              {children}
            </div>
          </main>
        </div>

        {/* Right Sidebar - Fixed on large screens */}
        {/* This <aside> is now outside the main flex container for LeftSidebar and Main content */}
        <aside
          className="hidden xl:block fixed top-[77px] right-0 h-[calc(100vh-77px)] 
                     w-[280px] xl:w-[320px] 
                     border-l border-light-700 dark:border-dark-400
                     overflow-y-auto no-scrollbar z-30"
        >
          <RightSidebar />
        </aside>
      </div>
    </SidebarProvider>
  );
}
