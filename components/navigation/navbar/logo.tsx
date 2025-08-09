"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface LogoProps {
  isMobile?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isMobile = false }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback text component
  const LogoText = ({ className }: { className?: string }) => (
    <span className={`font-bold text-xl ${className}`}>
      <span className="text-primary-500">Creative</span>
      <span className="text-dark100_light900">Overflow</span>
    </span>
  );

  if (isMobile) {
    return (
      <Link href="/" className="flex items-center gap-1.5 sm:hidden">
        {!imageError ? (
          <Image
            src="/images/site-logo.svg"
            alt="Creative Overflow"
            width={35}
            height={35}
            priority
            onError={() => setImageError(true)}
            className="object-contain"
          />
        ) : (
          <LogoText className="text-sm" />
        )}
      </Link>
    );
  }

  return (
    <Link href="/" className="hidden sm:flex items-center gap-1.5">
      {!imageError ? (
        <>
          {/* Light Mode Logo */}
          <Image
            src="/images/Logo-dark.svg"
            alt="Creative Overflow"
            width={200}
            height={40}
            className="block dark:hidden object-contain"
            priority
            onError={() => setImageError(true)}
          />
          {/* Dark Mode Logo */}
          <Image
            src="/images/Logo-light.svg"
            alt="Creative Overflow"
            width={200}
            height={40}
            className="hidden dark:block object-contain"
            priority
            onError={() => setImageError(true)}
          />
        </>
      ) : (
        <LogoText />
      )}
    </Link>
  );
};

export default Logo;
