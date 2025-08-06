"use client";

import Image from "next/image";
import { usePathname, useRouter,useSearchParams } from "next/navigation";
import React, { useEffect,useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

interface LocalSearchProps {
  placeholder: string;
  otherClass: string;
  imgSrc: string;
  route: string;
  iconPosition?: "left" | "right";
}
const LocalSearch = ({
  placeholder,
  otherClass,
  imgSrc,
  route,
  iconPosition = "left",
}: LocalSearchProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const SearchParams = useSearchParams();
  const query = SearchParams.get("query") || "";
  const [searchQuary, setSearchQuary] = useState(query || "");

  useEffect(() => {
    const deboncefn = setTimeout(() => {
      if (searchQuary) {
        const newUrl = formUrlQuery({
          param: SearchParams.toString(),
          key: "query",
          value: searchQuary,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (SearchParams.has("query")) {
          const removeUrl = removeUrlQuery({
            param: SearchParams.toString(),
            keyRemove: ["query"],
          });
          router.push(removeUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(deboncefn);
  }, [searchQuary, SearchParams, router, route, pathName]);

  const handleClear = () => {
    setSearchQuary("");
    if (SearchParams.has("query")) {
      const removeUrl = removeUrlQuery({
        param: SearchParams.toString(),
        keyRemove: ["query"],
      });
      router.push(removeUrl, { scroll: false });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-[10px] px-4 gap-4 grow  min-h-[50px] background-light800_darkgradient",
        otherClass
      )}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        value={searchQuary}
        placeholder={placeholder || "Search questions..."}
        className={`border-none !bg-transparent placeholder shadow-none outline-none text-dark400_light800 no-focus  `}
        onChange={(e) => setSearchQuary(e.target.value)}
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
      {searchQuary && (
        <Image
          src="/icons/close.svg"
          alt="clear search"
          width={20}
          height={20}
          className="cursor-pointer !invert-colors-2  "
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default LocalSearch;
