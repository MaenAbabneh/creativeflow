import Navbar from "@/components/navigation/navbar/index";
import { AppSidebar } from "@/components/navigation/navbar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen background-light900_dark200">
      <SidebarProvider>
        <Navbar  />
        <div className="flex flex-1 pt-[73px]">
          <AppSidebar />
          <main className="flex-1 px-4 md:px-10 py-6 max-w-full overflow-hidden">
            <SidebarTrigger className="mb-6 pl-[4px]  fixed md:block hidden  overflow-hidden z-30 "  />
            <div className="max-w-5xl mx-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
