import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
  showName?: boolean;
  nameClassName?: string;
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  className = "h-9 w-9",
  fallbackClassName,
  showName = false,
  nameClassName = "paragraph-semibold text-dark300_light700",
}: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)} className="flex items-center gap-2">
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover"
            width={36}
            height={36}
            quality={100}
          />
        ) : (
          <AvatarFallback
            className={cn(
              fallbackClassName,
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white"
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      {showName && <span className={nameClassName}>{name}</span>}
    </Link>
  );
};

export default UserAvatar;
