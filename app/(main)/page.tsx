import {signOut} from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function App() {
  return (
    <>
      <form
        className="text-dark200_light800 absolute top-32"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGNIN });
        }}
      >
        <Button type="submit">log out</Button>
      </form>
    </>
  );
}
