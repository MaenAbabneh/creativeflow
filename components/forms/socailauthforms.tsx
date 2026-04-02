"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AuthSocailForms = () => {
  const buttonStyles =
    "w-full h-12 text-dark400_light900 background-light800_dark100 border border-light-700 dark:border-dark-400 body-medium flex items-center justify-center gap-2 rounded-lg hover:bg-light-700 dark:hover:bg-dark-300 transition-colors duration-200 cursor-pointer";

  const handleLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
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
    <div className="mt-8 w-full max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-700 dark:border-dark-400"></div>
        </div>
        <div className="relative flex justify-center text-small-regular">
          <span className="bg-light-850 dark:bg-dark-200 px-4 text-dark500_light400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          className={buttonStyles}
          onClick={() => handleLogin("github")}
        >
          <Image
            className="invert-colors object-contain"
            src={"/icons/github.svg"}
            alt={"Github logo"}
            width={20}
            height={20}
          />
          <span>Continue with GitHub</span>
        </Button>

        <Button
          type="button"
          className={buttonStyles}
          onClick={() => handleLogin("google")}
        >
          <Image
            className="object-contain"
            src={"/icons/google.svg"}
            alt={"Google logo"}
            width={20}
            height={20}
          />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default AuthSocailForms;
