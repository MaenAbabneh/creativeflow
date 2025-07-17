import Image from "next/image";
import Link from "next/link";

import SocailAuthForms from "@/components/forms/socailauthforms";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 dark:bg-auth-dark bg-auth-light bg-contain bg-center bg-no-repeat dark:bg-dark-100">
      <div className="w-full max-w-md">
        <section className="background-light850_dark200 shadow-light100_dark100 rounded-xl border border-light-700 dark:border-dark-400 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <h1 className="h2-bold text-dark100_light900 mb-2">
                Creative Overflow
              </h1>
              <p className="paragraph-regular text-dark500_light400">
                Connect with developers worldwide
              </p>
            </div>
            <Link href="/" className="flex-shrink-0 ml-4">
              <Image
                src="/images/site-logo.svg"
                alt="Creative Overflow"
                width={40}
                height={40}
                className="object-contain hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Form Content */}
          {children}

          {/* Social Auth */}
          <SocailAuthForms />
        </section>
      </div>
    </main>
  );
}
