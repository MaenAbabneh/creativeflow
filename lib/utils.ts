import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMap } from "@/constants/techmap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getPuplishTime = (date: Date) => {
  const currentDate = new Date();
  const timeDifference =
    (currentDate.getTime() - new Date(date).getTime()) / 1000;
  const unite = [
    { name: "year", value: 31536000 },
    { name: "month", value: 2592000 },
    { name: "day", value: 86400 },
    { name: "hour", value: 3600 },
    { name: "minute", value: 60 },
    { name: "second", value: 1 },
  ];
  for (const { name, value } of unite) {
    const time = Math.floor(timeDifference / value);
    if (time >= 1 ) {
      return `${time} ${name} ago`;
    }
  }
  return "just now";
};
