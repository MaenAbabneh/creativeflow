import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";

import { Button } from "./ui/button";

interface props<T> {
  success: boolean;
  data?: T[] | undefined | null;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface skeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const Skeleton = ({ image, title, message, button }: skeletonProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-8 w-full min-w-[740px] mx-auto">
      <Image
        src={image.dark}
        alt={image.alt}
        width={300}
        height={230}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ">
        {title}
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {message}
      </p>
      {button && (
        <Link href={button.href} className="mt-4">
          <Button className="primary-gradient-light dark:primary-gradient-dark px-6 py-6 rounded-md mt-4 sm:mt-0 cursor-pointer w-full sm:w-auto">
            <span className="body-semibold !text-white">
              {button.text}
            </span>
          </Button>
        </Link>
      )}
    </div>
  );
};

const DataRender = <T,>({
  success,
  data,
  render,
  error,
  empty = DEFAULT_EMPTY,
}: props<T>) => {
  if (!success) {
    return (
      <Skeleton
        image={{
          light: "/images/light-error.png",
          dark: "/images/dark-error.png",
          alt: "Error state illustration",
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details ? JSON.stringify(error.details) : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <Skeleton
        image={{
          light: "/images/light-illustration.png",
          dark: "/images/dark-illustration.png",
          alt: "Empty state illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  }
  return render(data);
};

export default DataRender;
