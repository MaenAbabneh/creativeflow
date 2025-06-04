"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeUrlQuery } from "@/lib/url";

import { Button } from "../ui/button";

const filtertags = [
  { label: "New", value: "new" },
  { label: "Popular", value: "popular" },
  { label: "Answered", value: "answered" },
  { label: "Unanswered", value: "unanswered" },
];

const HomeFilter = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const filterParam = SearchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState(filterParam || "");
  const handleFilterChange = (filter: string) => {
    let newUrl = "";
    if (filter === activeFilter) {
      setActiveFilter("");
      newUrl = removeUrlQuery({
        param: SearchParams.toString(),
        keyRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActiveFilter(filter);
      newUrl = formUrlQuery({
        param: SearchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <section className="mt-8 flex flex-wrap max-w-[500px] lg:max-w-[700px] gap-4 ">
      {filtertags.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => handleFilterChange(value)}
          className={` !rounded-1.5 ${activeFilter === value ? "bg-dark-200 text-gradient transition-transform scale-110" : "text-dark400_light700 background-light800_dark300"} `}
        >
          <span>{label} </span>
        </Button>
      ))}
    </section>
  );
};

export default HomeFilter;
