import Image from "next/image";
import Link from "next/link";

import SocailAuthForms from "@/components/forms/socailauthforms";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-center min-h-screen  dark:bg-auth-dark bg-auth-light bg-contain bg-center bg-no-repeat dark:bg-dark-100">
      <section className="light-border flex justify-start items-start flex-col background-light800_dark200 shadow-light100_dark100 rounded-2xl border px-4 pt-4 pb-4 shadow-md w-full max-w-[520px] sm:min-w-[450px] ">
        <div className="flex items-center min-w-full justify-between">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">
              Join Creative Overflow
            </h1>
            <p className="paragraph-regular text-dark500_light400">
              Sign in to your account or create a new one
            </p>
          </div>
          <Link href="/" className="ml-auto">
            <Image
              src="/images/site-logo.svg"
              alt={"Creative Overflow"}
              width={50}
              height={50}
              className="object-contain hover:scale-105 transition-transform duration-200 ease-in-out "
            />
          </Link>
        </div>
        {children}
        <SocailAuthForms />
      </section>
    </main>
  );
}
