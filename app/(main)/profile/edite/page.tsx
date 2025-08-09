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
    <div className="flex min-h-screen w-full flex-col">
      {/* Header Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto ml-0 sm:ml-11">
        <h1 className="h1-bold text-dark100_light900 mt-8  mb-6 ">
          Edit Profile
        </h1>
      </div>

      {/* Form Container */}
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto pb-8">
        <div className="w-full max-w-4xl mx-auto">
          <ProfileForm user={data?.user as Users} />
        </div>
      </div>
    </div>
  );
};

export default Page;
