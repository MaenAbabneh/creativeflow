import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techDescriptionMap, techMap } from "@/constants/techmap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export function getTechDescription(techName: string): string {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  return (
    techDescriptionMap[normalizedTech] ||
    `${techName} is a technology or tool widely used in software development, providing valuable features and capabilities.`
  );
}

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
    if (time >= 1) {
      return `${time} ${name} ago`;
    }
  }
  return "just now";
};

export const formatNumber = (number?: number) => {
  if (number === undefined) return "0";
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};