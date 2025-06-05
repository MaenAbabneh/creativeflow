import LeftSidebar from "@/components/navigation/left-sidebar";
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
        <div className="fixed top-0 left-0 right-0 z-50 h-[77px]">
          <Navbar />
        </div>

        {/* Main Layout Container */}
        <div className="flex pt-[77px]">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content Area - Takes up available space */}
          <main
            className="flex-1 min-h-[calc(100vh-77px)] 
                         overflow-y-auto no-scrollbar
                         px-4 md:px-6 lg:px-8 xl:px-10 py-6"
            // The lg:mr-[280px] xl:lg:mr-[320px] creates space for the fixed RightSidebar
            // We apply margin only on screens where RightSidebar is visible and fixed
            // For screens smaller than lg, RightSidebar is handled by MobileRightSidebar (Sheet)
          >
            <div className="mx-auto max-w-none lg:max-w-4xl xl:max-w-5xl">
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
                     background-light800_dark300
                     overflow-y-auto no-scrollbar z-10" // Added z-10 to ensure it's above main content if overlap occurs
        >
          <RightSidebar />
        </aside>
      </div>
    </SidebarProvider>
  );
}
