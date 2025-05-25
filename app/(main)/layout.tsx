import Navbar from "@/components/navigation/navbar/index";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
      <main>
        <Navbar />
        {children}
      </main>
  );
}
