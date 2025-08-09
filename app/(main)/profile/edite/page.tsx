import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileForm from "@/components/forms/profileform";
import ROUTES from "@/constants/routes";
import { getUserDetails } from "@/lib/actions/users.action";
import { Users } from "@/types/global";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGNIN);

  const { success, data } = await getUserDetails({ userId: session.user.id });
  if (!success) redirect(ROUTES.SIGNIN);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <ProfileForm user={data?.user as Users} />
    </>
  );
};

export default Page;