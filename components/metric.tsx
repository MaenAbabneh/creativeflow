import Link from "next/link";
import React from "react";
import Image from "next/image";
interface MetricProps {
  image: string;
  alt: string;
  title: string;
  value: string | number;
  href?: string;
  isAuthor?: boolean;
  textStyles: string;
}
const Metric = ({
  image,
  alt,
  title,
  value,
  href,
  isAuthor,
  textStyles,
}: MetricProps) => {
  const contentMetric = (
    <>
      <Image
        src={image}
        alt={alt}
        width={isAuthor ? 30 : 20}
        height={20}
        className={`object-contain ${isAuthor ? "rounded-full " : "filter-to-blue mt-5 sm:mt-0"} `}
      />
      <p className={`flex items-center gap-1 ${isAuthor? "":"mt-5 sm:mt-0"} ${textStyles}`}>
        {value}

        <span className={`small-regular line-clamp-1 ${isAuthor ? "sm:block" : ""} `}>
          {title}
        </span>
      </p>
    </>
  );

  return href ? (
    <Link
      href={href}
      className="cursor-pointer flex flex-wrap items-center gap-2"
    >
      {contentMetric}
    </Link>
  ) : (
    <div className=" flex-center gap-2">{contentMetric}</div>
  );
};

export default Metric;
