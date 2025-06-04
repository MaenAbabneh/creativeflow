import LeftSidebar from "@/components/navigation/left-sidebar";
import Navbar from "@/components/navigation/navbar/navbar";
import RightSidebar from "@/components/navigation/rigth-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <SidebarProvider>
      <div className="flex flex-col min-h-screen background-light850_dark200">
        <Navbar />
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 
                      sm:grid-cols-1 
                      md:grid-cols-[auto_1fr] 
                      lg:grid-cols-[auto_1fr_300px] 
                      xl:grid-cols-[280px_1fr_320px] 
                      gap-0 pt-[77px]">
          
          {/* Left Sidebar */}
          <div className="hidden md:block sticky top-[77px] h-screen 
                         w-[70px] md:w-[90px] lg:w-auto xl:w-full
                         overflow-y-auto overflow-x-hidden
                         transition-all duration-300 ease-in-out
                         border-r border-light-700 dark:border-dark-400
                         background-light900_dark300">
            <LeftSidebar />
          </div>
          
          {/* Main Content */}
          <main className="px-4 md:px-6 lg:px-10 py-6 
                         min-h-[calc(100vh-77px)]
                         overflow-y-auto">
            <div className="mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl">
              {children}
            </div>
          </main>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block sticky   top-[77px] h-screen
                         overflow-y-auto
                         transition-all duration-300 ease-in-out
                         border-l border-light-700 dark:border-dark-400
                         background-light800_dark300
                          ">
            <RightSidebar />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

