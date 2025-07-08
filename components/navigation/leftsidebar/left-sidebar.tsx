import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";
import LeftSidebarClient from "./left-sidebar-client";

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id || null;

  // إنشاء server action هنا
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: ROUTES.HOME });
  };
  return <LeftSidebarClient userId={userId} signOutAction={handleSignOut} session={session} />;
};

export default LeftSidebar;
