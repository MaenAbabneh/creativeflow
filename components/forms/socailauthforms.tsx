"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AuthSocailForms = () => {
  const buttonStyles =
    "text-dark400_light900 background-light800_dark100 body-medium min-h-12 px-4 py-3.5 flex-1 rounded-2 w-full cursor-pointer hover:bg-light900_dark200 ";

  const handleLogin = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      if (result?.error) {
        toast(`Authentication Error: ${result.error}`);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.log(error);
      toast(`Authentication to ${provider} Error`, {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        position: "top-right",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5 min-w-full ">
      <Button
        type="submit"
        className={buttonStyles}
        onClick={() => handleLogin("github")}
      >
        <Image
          className=" invert-colors mr-1 object-contain"
          src={"/icons/github.svg"}
          alt={"Github logo"}
          width={20}
          height={20}
        />
        <span className="">Login with GitHub</span>
      </Button>
      <Button className={buttonStyles} onClick={() => handleLogin("google")}>
        <Image
          className=" mr-1 object-contain"
          src={"/icons/google.svg"}
          alt={"Google logo"}
          width={20}
          height={20}
        />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default AuthSocailForms;
